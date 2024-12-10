package com.reaplette.signup.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reaplette.domain.PreferenceVO;
import com.reaplette.domain.UserVO;
import com.reaplette.signup.service.SignUpService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    SignUpService signUpService;

    @GetMapping("/verifyEmail")
    public String showVerifyEmail(HttpSession session) {
        signUpService.checkAndInvalidateExpiredCode(session); // 인증번호 만료 확인
        String id = (String) session.getAttribute("id"); // 세션에 저장된 아이디 확인
        String verificationCode = (String) session.getAttribute("verificationCode");

        if (id == null) {
            id = "example@email.com"; // 디버깅용
            session.setAttribute("id", id); // 아이디 세션에 저장
        }

        log.info("세션에서 가져온 사용자 정보: id={}", id);
        return "signup/verifyEmail";
    }

    @PostMapping("/resendVerification") // 경로 signup/signup/ 경로 겹치면 오류
    public ResponseEntity<Map<String, String>> resendVerification(HttpSession session) {
        String id = (String) session.getAttribute("id"); // 세션에서 ID 확인
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .header("Cache-Control", "no-store, no-cache") // 캐싱 방지
                    .body(Map.of("message", "세션에서 사용자 정보를 찾을 수 없습니다."));
        }
        // 인증번호 재발송 처리
//        System.out.println("인증번호를 재발송합니다.");
        signUpService.handleResendVerification(id, session);
        String newCode = (String) session.getAttribute("verificationCode");
//        log.info("응답 메시지 준비 중 - 새 인증번호: {}", newCode); // 디버깅용
//        System.out.println("새로 발송된 인증번호: " + newCode); // 인증번호 확인
//        signUpService.saveVerificationCodeToSession(id, newCode, session);
        return ResponseEntity.ok(Map.of("message", "새로운 인증번호를 발송했습니다.", "newCode", newCode // 새 인증번호를 반환
        ));
    }

    @PostMapping("/expireVerificationCode")
    @ResponseBody
    public ResponseEntity<String> expireVerificationCode(HttpSession session) {
        signUpService.removeVerificationCodeFromSession(session);
        return ResponseEntity.ok("인증번호가 유효하지 않습니다. 새 인증번호를 요청하세요.");
    }

    @GetMapping("/setPassword")
    public String toSetPasswordPage(HttpSession session) {
        String id = (String) session.getAttribute("id");
        if (id == null) {
//            log.warn("세션에서 가져온 사용자 정보: id={}", id);
            return "redirect:/signup/enterEmail";
        }
//        log.info("세션에서 가져온 사용자 정보: id={}", id);
        return "signup/setPassword";
    }

    @PostMapping("/setPassword")
    public String setPassword(@RequestParam("pw") String pw, HttpSession session) {
        String id = (String) session.getAttribute("id");
        if (id == null) {
//            log.warn("세션에서 가져온 사용자 정보: id={}", id);
            return "redirect:/signup/enterEmail";
        }

        session.setAttribute("pw", pw);

        // 로그인 타입 설정
        String loginType = (String) session.getAttribute("loginType");
        if (loginType == null) {
            loginType = "local";
            session.setAttribute("loginType", loginType);
        }

        log.info("세션에서 가져온 정보: id={}, pw={}, loginType={}", id, pw, loginType);
        return "redirect:/signup/setPreference";
    }

    @GetMapping("/socialLogin")
    public String handleSocialLogin(HttpSession session) {
        String id = "social_user@example.com"; // 네이버에서 가져온 사용자 이메일
        session.setAttribute("id", id);
        session.setAttribute("loginType", "naver");

        log.info("세션에서 가져온 정보: id={}", id);
        return "redirect:/signup/setPreference";
    }

    @GetMapping("/setPreference")
    public String toSetPreferencePage(HttpSession session) {
        String id = (String) session.getAttribute("id");
        String pw = (String) session.getAttribute("pw");
        String loginType = (String) session.getAttribute("loginType");

        if (id == null || pw == null || loginType == null) {
            log.info("세션에서 가져온 사용자 정보: id={}, pw={}, loginType={}", id, pw, loginType);
            return "redirect:/signup/enterEmail";
        }
        log.info("세션 값 확인: id={}, pw={}, loginType={}", session.getAttribute("id"), session.getAttribute("pw"), session.getAttribute("loginType"));
        return "signup/setPreference";
    }

    @PostMapping("/checkUsername")
    @ResponseBody
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        boolean isDuplicate = signUpService.checkUsernameDuplicate(username);
        log.info("활동명 중복 확인: {} -> {}", username, isDuplicate);
        return ResponseEntity.ok(isDuplicate);
    }

    @PostMapping("/setPreference")
    @ResponseBody
    public ResponseEntity<String> insertPreference(@RequestParam String username, @RequestParam String categories, HttpSession session) {
        try {
            String id = (String) session.getAttribute("id");
            String pw = (String) session.getAttribute("pw");
            String loginType = (String) session.getAttribute("loginType");

            if (id == null || pw == null || loginType == null) {
                return ResponseEntity.badRequest().body("세션에서 유효한 정보를 찾을 수 없습니다.");
            }

            signUpService.insertUserAndPreference(id, pw, loginType, username, categories);

            return ResponseEntity.ok("회원가입 성공 !");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("회원가입 정보 저장 중 문제가 발생했습니다.");
        }
    }
}
