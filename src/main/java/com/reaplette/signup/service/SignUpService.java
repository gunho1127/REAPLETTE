package com.reaplette.signup.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reaplette.domain.PreferenceVO;
import com.reaplette.domain.UserVO;
import com.reaplette.signup.mappers.SignUpMapper;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@Log4j2
@Transactional
@RequiredArgsConstructor
@Service
public class SignUpService {

    private final SignUpMapper signUpMapper;

    // application.properties에서 SMTP 설정값 주입
    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("${spring.mail.password}")
    private String senderPassword;

    @Value("${spring.mail.host}")
    private String smtpHost;

    @Value("${spring.mail.port}")
    private String smtpPort;

    @Value("${spring.mail.properties.mail.smtp.auth}")
    private String smtpAuth;

    @Value("${spring.mail.properties.mail.smtp.ssl.enable}")
    private String smtpSsl;

//    public SignUpService(SignUpMapper signUpMapper) {
//        this.signUpMapper = signUpMapper;
//    }

    public String generateVerificationCode () {
        SecureRandom random = new SecureRandom();  // 보안성을 강화한 랜덤 생성기
        return String.format("%06d", random.nextInt(1000000));  // 6자리 랜덤 인증번호 생성
    }

    public void sendVerificationEmail(String id, String code) {
        // SMTP 설정
        Properties props = new Properties();
        props.put("mail.smtp.host", smtpHost);
        props.put("mail.smtp.port", smtpPort);
        props.put("mail.smtp.auth", smtpAuth);
        props.put("mail.smtp.ssl.enable", smtpSsl);

        // 인증 객체 생성
        Session mailSession = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, senderPassword);
            }
        });

        try {
            // 이메일 작성
            MimeMessage message = new MimeMessage(mailSession);
            message.setFrom(new InternetAddress(senderEmail));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(id)); // 수신자 이메일
            message.setSubject("[REAPLETTE] 회원가입 인증번호");

            // 이메일 본문 작성
            String content = """
                    <html>
                    <body>
                        <h2>회원가입 인증번호 안내</h2>
                        <p>안녕하세요.</p>
                        <p>귀하의 인증번호는 <strong>%s</strong> 입니다.</p>
                        <p>유효시간은 1분입니다.</p>
                        <p>감사합니다.</p>
                    </body>
                    </html>
                    """.formatted(code);
            message.setContent(content, "text/html; charset=utf-8");

            // 이메일 전송
            Transport.send(message);
            System.out.println("Sending email to: " + id + " with code: " + code);
        } catch (MessagingException e) {
            System.err.println("인증번호 전송 실패 " + e.getMessage());
            throw new RuntimeException("이메일 발송 실패", e);
        }
    }

    public void handleResendVerification(String id, HttpSession session) {
        log.info("재발송 요청 시작: 아이디 = {}", id); // 재발송 요청 시작 로그 추가
        checkAndInvalidateExpiredCode(session);
        String newCode = generateVerificationCode();
        log.info("새로운 인증번호 생성됨: {}", newCode); // 새 인증번호 로그 추가
        saveVerificationCodeToSession(id, newCode, session);
        sendVerificationEmail(id, newCode);
        log.info("새 인증번호 세션에 저장됨: 아이디 = {}", id); // 세션 저장 완료 로그 추가
    }

    // 세션에 인증번호 저장
    public void saveVerificationCodeToSession(String id, String code, HttpSession session) {
        synchronized (session) {
            session.setAttribute("verificationCodeId", id);
            session.setAttribute("verificationCode", code);
            session.setAttribute("verificationCodeExpiration", System.currentTimeMillis() + 20 * 1000); // 유효 시간
//          System.out.println("세션에 인증번호 저장: ID=" + id + ", Code=" + code);
            log.info("세션에 저장된 인증번호: {}, 유효시간: {}", code, session.getAttribute("verificationCodeExpiration"));
        }
    }

    // 세션에서 인증번호 만료 여부 확인 및 제거
    public void checkAndInvalidateExpiredCode(HttpSession session) {
        Long expirationTime = (Long) session.getAttribute("verificationCodeExpiration");
        if (expirationTime != null && System.currentTimeMillis() > expirationTime) {
            removeVerificationCodeFromSession(session); // 만료된 인증번호 제거
            System.out.println("만료된 인증번호가 세션에서 제거되었습니다.");
        }
    }

    // 재발송 버튼 누르면 기존 인증번호를 삭제
    public void removeVerificationCodeFromSession(HttpSession session) {
        session.removeAttribute("verificationCode");
        session.removeAttribute("verificationCodeExpiration");
        System.out.println("세션에서 인증번호 제거 완료.");
    }

    // 활동명 중복 확인
    public boolean checkUsernameDuplicate(String username) {
        return signUpMapper.checkUsernameDuplicate(username) > 0;
    }

    public void insertUserAndPreference(String id, String pw, String loginType, String username, String categories) throws JsonProcessingException {
        // UserVO 생성 및 저장
        UserVO user = new UserVO();
        user.setId(id);
        user.setPw(pw);
        user.setUsername(username);
        user.setProfileImagePath("../../../resources/images/myPage/icon-jam-icons-outline-logos-user1.svg");
        user.setSignInDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        user.setIsDelete(1); // 실존 상태
        user.setLoginType(loginType);

        signUpMapper.insertUser(user);

        // PreferenceVO 생성 및 저장
        ObjectMapper objectMapper = new ObjectMapper();
        String[] categoryArray = objectMapper.readValue(categories, String[].class);

        for (String category : categoryArray) {
            PreferenceVO preference = new PreferenceVO();
            preference.setId(id);
            preference.setCategory(category);
            signUpMapper.insertPreference(preference);
        }

        log.info("회원 정보 저장 완료: id={}, username={}, categories={}", id, username, Arrays.toString(categoryArray));
    }
}
