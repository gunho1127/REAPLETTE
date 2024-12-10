<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>REAPLETTE - 비밀번호 설정</title>
    <link rel="stylesheet" href="/resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/signup/setPassword.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 border-end border-light"></div> <!-- 왼쪽 구분선 -->
            <div class="col-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="login-box">
                    <h2 class="text-center">REAPLETTE</h2>
                    <form id="password-form" class="w-100" method="post" action="/signup/setPassword">
                        <!-- 이메일 입력란 (수정 불가) -->
                        <div class="mb-3">
                            <label for="id" class="form-label">아이디</label>
                            <!-- 서버에서 전달받은 email 값 사용 -->
                            <input type="text" class="form-control" id="id" value="${sessionScope.id}" readonly disabled>
                        </div>
                        <!-- 비밀번호 입력란 -->
                        <div class="mb-3 input-container">
                            <label for="password" class="form-label">비밀번호</label>
                            <div class="position-relative">
                                <input type="password" class="form-control" id="password" name="pw" placeholder="비밀번호를 입력하세요.">
                                <!-- 비밀번호 보이기/숨기기, 클리어 아이콘 -->
                                <span id="clear-icon" class="clear-icon position-absolute top-50 end-0 translate-middle-y">
                                    <img src="/resources/images/signup/closed-eye-icon.png" id = "toggle-password" alt="숨기기 아이콘" class="closed-eye-img">
                                    <!-- <img src="/resources/images/signup/clear-icon.png" alt="지우기 아이콘" class="clear-icon-img"> -->
                                    <!-- <img src="/resources/images/signup/open-eye-icon.png" alt="보기 아이콘" class="open-eye-img"> -->
                                </span>
                            </div>
                            <!-- 오류 메시지 -->
                            <span id="password-error" class="text-danger mt-2" style="display: none;"></span>
                            </div>
                        <!-- 비밀번호 확인 입력란 -->
                        <div class="mb-3 input-container">
                            <label for="password-confirm" class="form-label">비밀번호 확인</label>
                            <div class="position-relative">
                                <input type="password" class="form-control" id="password-confirm" placeholder="비밀번호를 다시 입력하세요.">
                                <!-- 클리어 아이콘 -->
                                <span id="clear-icon-confirm" class="clear-icon position-absolute top-50 end-0 translate-middle-y">
                                    <img src="/resources/images/signup/clear-icon.png" alt="Clear Input">
                                </span>
                            </div>
                            <span id="confirm-password-error" class="text-danger mt-2" style="display: none;"></span>
                        </div>
                        <button type="submit" class="w-100" id="start-button">회원가입</button>
                        <div class="border-top mt-3" style="border-color: #DDE1E6;"></div>
                    </form>
                </div>
            </div>
            <div class="col-2 border-start border-light"></div> <!-- 오른쪽 구분선 -->
        </div>
    </div>
    <script src="/resources/js/bootstrap.bundle.min.js" defer></script>
    <script src="/resources/js/signup/setPassword.js" defer></script>
</body>
</html>
