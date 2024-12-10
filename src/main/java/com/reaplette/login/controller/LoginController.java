package com.reaplette.login.controller;

import com.reaplette.domain.UserVO;
import com.reaplette.login.service.LoginService;
import com.reaplette.signup.service.SignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final SignUpService signUpService;

//    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
//    private final LoginService loginService;
//    private final SignUpService signUpService;

//    public LoginController(LoginService loginService, SignUpService signUpService) {
//        this.loginService = loginService;
//        this.signUpService = signUpService;

    // 이메일 입력 화면
    @GetMapping("/enterEmail")
    public String showEnterEmailForm() {
        return "login/enterEmail";
    }


    // 입력된 이메일 검증 및 상태 확인
    @PostMapping("/enterEmail")
    public String handleEnterEmail(UserVO user, HttpSession session) {
        session.setAttribute("id",user.getId());

        if (loginService.getUserById(user.getId()) == null) {
            // 미가입자일 경우 이메일을 세션에 저장하고, verifyEmail 페이지로 리디렉션
            String verificationCode = signUpService.generateVerificationCode();
            signUpService.sendVerificationEmail(user.getId(), verificationCode);
            session.setAttribute("verificationCode", verificationCode);
            return "redirect:/signup/verifyEmail";
        } else {

            return "redirect:/login/enterPassword";
        }
    }


    // 비밀번호 입력 화면
    @GetMapping("/enterPassword")
    public String showEnterPassword(HttpSession session) {
//        UserVO user = (UserVO) session.getAttribute("user");
//        if (user.getId() == null) {
//            return "redirect:/login/enterEmail"; // 세션에 ID가 없을 경우 로그인 페이지로 리다이렉트
//        }
        return "login/enterPassword"; // 비밀번호 입력 화면으로 이동
    }

    @GetMapping("/loginTypeCheck")
    public ResponseEntity<Map<String, Boolean>> checkLoginType(@RequestParam("id") String id) {
        // 로그를 출력하여 요청을 확인할 수 있습니다.
        log.info("Received ID: " + id);
        // 결과를 JSON 형태로 반환
        Map<String, Boolean> response = new HashMap<>();
        response.put("isNaver", loginService.isNaver(id));

        return ResponseEntity.ok(response);
    }

    // 입력된 비밀번호 검증 및 로그인 처리
    @PostMapping("/enterPassword")
    @ResponseBody
    public Map<String, Object> handleLogin(@RequestBody Map<String, String> request, HttpSession session) {
        String pw = request.get("pw");
        Map<String, Object> response = new HashMap<>();
        // 세션에서 아이디 가져오기
        String id = (String) session.getAttribute("id");
        if (id == null) {
            response.put("error", "아이디 세션이 만료되었습니다. 다시 입력하세요.");
            response.put("redirect", "/login/enterEmail");
            return response;
        }

        // 비밀번호가 비어있는지 확인
        if (pw == null || pw.trim().isEmpty()) {
            response.put("error", "비밀번호를 입력하지 않았습니다.");
            return response;
        }

        try {
            // 로그인 시도 제한 및 비밀번호 검증
            boolean isPasswordValid = loginService.validatePassword(id, pw, session);

            if (isPasswordValid) {
                // 사용자 조회
                UserVO user = loginService.getUserById(id);


                session.setAttribute("user", user); // 로그인 성공 시 사용자 정보를 세션에 저장

                session.removeAttribute("id"); // 세션에서 ID 제거
                response.put("redirect", "/"); // index
            } else {
                // 로그인 시도 제한 응답 처리
                Integer attemptCount = (Integer) session.getAttribute("attemptCount");
                if (attemptCount != null && attemptCount >= 10) {
                    response.put("error", "10회 이상 잘못된 비밀번호 입력으로 로그인을 제한합니다. 잠시 후 다시 시도하세요.");
                } else {
                    response.put("error", "비밀번호가 일치하지 않습니다. 다시 입력하세요.");
                }
            }
        } catch (Exception e) {
            response.put("error", "서버 처리 중 문제가 발생했습니다. 다시 시도하세요.");
        }

        return response;
    }


    // 비밀번호 찾기
    @GetMapping("/findPassword")
    public String handleFindPassword(HttpSession session) {
        if (session.getAttribute("id") == null) {
            return "redirect:/login/enterEmail"; // 세션에 ID가 없을 경우 로그인 페이지로 리다이렉트
        }
        return "login/findPassword"; // 비밀번호 찾기 화면으로 이동
    }

    // 비밀번호 재설정 처리
//    @PostMapping("/findPassword")
//    public ResponseEntity<Map<String, Object>> handleFindPassword(@RequestBody String id,
//                                                             HttpSession session) {
//        log.info("/findPassword");
//        Map<String, Object> response = new HashMap<>();
//
//        // 세션에 ID가 없으면 에러 반환
//        if (id == null) {
//            log.info("아이디 값 없음 ㅜㅜ {}", id);
//            response.put("error", "아이디 세션이 만료되었습니다. 다시 입력하세요.");
//            response.put("redirect", "/login/enterEmail");
//            return response;
//        } else {
//            log.info("아이디 값 있음 !! {}", id);
//            session.setAttribute("id", id); // 세션에 ID 저장
//        }
//
//        try {
//            // 임시 비밀번호 생성 및 이메일 발송
//
////            UserVO user = (UserVO) session.getAttribute("user");
//
//            loginService.resetPasswordAndSendEmail(id);
//
//            response.put("success", true);
//
//        } catch (IllegalArgumentException e) {
//            log.info("사용자 정보 확인 실패: {}", e.getMessage());
//            response.put("error", "해당 사용자 정보를 찾을 수 없습니다.");
//        } catch (Exception e) {
//            log.info("비밀번호 재설정 중 오류 발생: {}", e.getMessage());
//            response.put("error", "비밀번호 재설정 중 문제가 발생했습니다. 다시 시도하세요.");
//        }
//
//        log.info(response);
//        log.info(response.toString());
//
//        return response;
//    }

    @PostMapping("/findPassword")
    public ResponseEntity<Map<String, Object>> handleFindPassword(@RequestBody String id, HttpSession session) {
//        log.info("/findPassword");
        Map<String, Object> response = new HashMap<>();

        // 세션에 ID가 없으면 에러 반환
        if (id == null || id.trim().isEmpty()) {
//            log.info("아이디 확인 실패: {}", id);
            response.put("error", "아이디 세션이 만료되었습니다. 다시 입력하세요.");
            response.put("redirect", "/login/enterEmail");

            // 400 Bad Request 상태 코드와 함께 응답
            return ResponseEntity.badRequest().body(response);
        } else {
//            log.info("아이디 확인 성공: {}", id);
            session.setAttribute("id", id); // 세션에 ID 저장
        }

        try {
            // 임시 비밀번호 생성 및 이메일 발송
            loginService.resetPasswordAndSendEmail(id);
            response.put("success", true);
            // 200 OK 상태 코드와 함께 성공 응답
            return ResponseEntity.ok().body(response);

        } catch (IllegalArgumentException e) {
//            log.info("사용자 정보 확인 실패: {}", e.getMessage());
            response.put("error", "해당 사용자 정보를 찾을 수 없습니다.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

        } catch (Exception e) {
//            log.info("비밀번호 재설정 중 오류 발생: {}", e.getMessage());
            response.put("error", "비밀번호 재설정 중 문제가 발생했습니다. 다시 시도하세요.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

/*
    @PostMapping("/login/verifyNaverUser")
    @ResponseBody
    public Map<String, Object> verifyNaverUser(@RequestBody UserVO userVO) {
        Map<String, Object> response = new HashMap<>();

        // 이메일로 사용자 조회
        UserVO user = loginService.getUserByEmail(userVO.getEmail());

        if (user != null) {
            response.put("isRegistered", true);
        } else {
            response.put("isRegistered", false);
        }

        return response;
    }
*/
}
