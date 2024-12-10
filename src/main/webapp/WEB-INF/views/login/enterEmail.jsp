<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이메일 입력</title>
    <link rel="stylesheet" href="/resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/login/enterEmail.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 border-end border-light"></div> <!-- 왼쪽 구분선 -->
            <div class="col-8 d-flex justify-content-center align-items-center min-vh-100">
                <section class="login-box">
                    <h2 class="text-center">REAPLETTE</h2>
                    <form id="login-form" class="w-100" action="/login/enterEmail" method="post" novalidate>
                        <!-- 아이디 입력란 -->
                        <div class="mb-3">
                            <label for="id" class="form-label">아이디</label>
                            <div class="input-container">
                                <input type="text" class="form-control" id="id" name="id" placeholder="이메일을 입력하세요." maxlength="320" aria-label="이메일 입력란">
                                <span class="clear-icon" id="clear-icon" aria-label="입력 내용 지우기">
                                    <img src="/resources/images/signup/clear-icon.png" alt="지우기 아이콘" class="clear-icon-img">
                                </span>
                            </div>
                            <!-- 오류 메시지 텍스트 -->
                            <span id="email-error" class="text-danger mt-2"></span>
                        </div>
                        <button type="submit" class="w-100" id="start-button">시작하기</button>
                        <p class="mt-3 text-center social-login-text">소셜 계정으로 간편 로그인:</p>
                        <button type="button" id="naver-login" class="btn btn-success w-100">
                            <span class="icon" style="display: inline-block; width: 20px; height: 20px; margin-right: 8px;">
                                <img src="/resources/images/signup/naver-icon.png" alt="네이버 아이콘" style="width: 100%; height: 100%; box-shadow: none;">
                            </span>
                            네이버로 시작하기
                        </button>
                        <div class="border-top mt-3" style="border-color: #DDE1E6;"></div>
                    </form>
                </section>
            </div>
            <div class="col-2 border-start border-light"></div> <!-- 오른쪽 구분선 -->
        </div>
    </div>
    <script src="/resources/js/bootstrap.bundle.min.js"></script>
    <script src="/resources/js/login/enterEmail.js" defer></script>
   <!-- <script src="https://developers.naver.com/docs/common/js/naveridlogin_js_sdk.js" defer></script> -->
</body>
</html>
