<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>REAPLETTE - 로그인</title>
    <!-- 브라우저 캐싱 문제를 방지 -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="stylesheet" href="/resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/login/enterPassword.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 border-end border-light"></div> <!-- 왼쪽 구분선 -->
            <div class="col-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="login-box">
                    <h2 class="text-center">REAPLETTE</h2>
                    <form id="login-form" class="w-100" method="POST" action="/login/enterPassword">
                        <!-- 이메일 입력란 (수정 불가) -->
                        <div class="mb-3">
                            <label for="id" class="form-label">아이디</label>
                            <input type="text" class="form-control" id="id" name="id" value="${sessionScope.id != null ? sessionScope.id : ''}" readonly>
                        </div>
                        <!-- 비밀번호 입력란 -->
                        <div class="mb-3">
                            <label for="password" class="form-label">비밀번호</label>
                            <input type="password" class="form-control" id="password" name="pw" placeholder="비밀번호를 입력하세요." maxlength="30">
                            <!-- <span class="clear-icon" id="clear-icon" aria-label="입력 내용 지우기">
                                <img src="/resources/images/signup/clear-icon.png" alt="지우기 아이콘" class="clear-icon-img">
                            </span>
                            <span id="toggle-password" class="eye-icon position-absolute top-50 end-0 translate-middle-y">
                                <img src="/resources/images/open-eye-icon.png" alt="보기 아이콘" class="open-eye-img">
                                <img src="/resources/images/closed-eye-icon.png" alt="감추기 아이콘" class="closed-eye-img">
                            </span> -->
                        </div>
                        <!-- 오류 메시지 -->
                        <span id="password-error" class="text-danger mt-2" style="display:none;"></span>
                        <!-- 비밀번호 찾기 버튼 -->
                        <div class="text-center mt-2">
                            <button id="forgot-button" class="btn btn-link text-decoration-none" style="color: #001D6C;">
                                비밀번호를 잊으셨나요?
                            </button>
                        </div>
                        <button type="submit" class="w-100" id="start-button">로그인</button>
                        <div class="border-top mt-3" style="border-color: #DDE1E6;"></div>
                    </form>
                </div>
            </div>
            <div class="col-2 border-start border-light"></div> <!-- 오른쪽 구분선 -->
        </div>
    </div>
    <script src="/resources/js/bootstrap.bundle.min.js" defer></script>
    <script src="/resources/js/login/enterPassword.js" defer></script>
</body>
</html>
