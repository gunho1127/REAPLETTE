<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>REAPLETTE - 비밀번호 재설정</title>
    <link rel="stylesheet" href="/resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/login/findPassword.css">
    <link rel="stylesheet" href="/resources/css/headerstyle.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 border-end border-light"></div> <!-- 왼쪽 구분선 -->
            <div class="col-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="login-box">
                    <h2 class="text-center">REAPLETTE</h2>
                    <!-- <form id="reset-password-form" class="w-100" method="POST" action="/login/findPassword"> -->
                    <div class="w-100">
                        <!-- 고정된 이메일 -->
                        <div class="mb-3">
                            <label for="id" class="form-label">아이디</label>
                            <input type="text" class="form-control" id="id" value="${sessionScope.id != null ? sessionScope.id : ''}" readonly>
                        </div>
                        <!-- 비밀번호 재설정 버튼 -->
                        <div class="mt-3">
                            <button type="button" class="w-100 mt-2" id="reset-password-button" onclick= "resetPassword()">비밀번호 재설정</button>
                        </div>
                        <sapn id="exception"></sapn>
                        <!-- 팝업 메시지 -->
                        <div id="popup-message" class="popup" style="display: none;"> <!-- 확인하려면 display: flex; -->
                            <div class="popup-content">
                                <div class="popup-text">
                                    <p>이메일로 임시 비밀번호를 발송했습니다.<br>확인 후 로그인하세요.</p>
                                    <button id="popup-button" class="btn btn-primary">확인</button>
                                </div>
                            </div>
                        </div>
                        <div class="border-top mt-3" style="border-color: #DDE1E6;"></div>
                    <!-- </form> -->
                    </div>
                </div>
            </div>
            <div class="col-2 border-start border-light"></div> <!-- 오른쪽 구분선 -->
        </div>
    </div>
    <script src="/resources/js/bootstrap.bundle.min.js" defer></script>
    <script src="/resources/js/login/findPassword.js" defer></script>
</body>
</html>
