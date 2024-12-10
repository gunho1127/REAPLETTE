<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>REAPLETTE - 취향 선택</title>
    <link rel="stylesheet" href="/resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/signup/setPreference.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 border-end border-light"></div> <!-- 왼쪽 구분선 -->
            <div class="col-8 d-flex justify-content-center align-items-center min-vh-100">
                <div class="login-box">
                    <h4 class="text-left">REAPLETTE</h4>
                    <form id="login-form" class="w-100" action="/setPreference" method="post">
                        <!-- 활동명 입력란 -->
                        <div class="mb-3">
                            <label for="username" class="form-label">활동명</label>
                            <div class="input-container">
                                <input type="text" class="form-control" id="username" name="username" placeholder="활동명을 입력하세요." maxlength="10" aria-label="활동명 입력란">
                                <span class="clear-icon" id="clear-icon">
                                    <img src="/resources/images/signup/clear-icon.png" alt="지우기 아이콘" class="clear-icon-img">
                                </span>
                            </div>
                            <!-- 오류 메시지 텍스트 -->
                            <span id="username-error" class="text-danger mt-2"></span>
                            <!-- 확인 버튼을 오른쪽으로 정렬 -->
                            <div class="d-flex justify-content-end">
                                <button type="button" id="verify-button" class="btn btn-primary">확인</button>
                            </div>
                        </div>
                        <div class="border-top mt-3" style="border-color: #DDE1E6;"></div>
                        <!-- 취향 선택란 -->
                        <div class="mb-3">
                            <label for="categories" class="form-label">취향 탐색 (최대 3개 선택 가능)</label>
                            <div id="categories" class="preference-container">
                                <div class="badge-row">
                                    <div class="badge" data-selected="false" data-category="건강/취미">건강/취미</div>
                                    <div class="badge" data-selected="false" data-category="경제경영" >경제경영</div>
                                    <div class="badge" data-selected="false" data-category="과학">과학</div>
                                    <div class="badge" data-selected="false" data-category="소설/시/희곡">소설/시/희곡</div>
                                    <div class="badge" data-selected="false" data-category="에세이">에세이</div>
                                </div>
                                <div class="badge-row">
                                    <div class="badge" data-selected="false" data-category="여행">여행</div>
                                    <div class="badge" data-selected="false" data-category="역사">역사</div>
                                    <div class="badge" data-selected="false" data-category="예술/대중문화">예술/대중문화</div>
                                    <div class="badge" data-selected="false" data-category="외국어">외국어</div>
                                    <div class="badge" data-selected="false" data-category="인문학">인문학</div>
                                </div>
                                <div class="badge-row">
                                    <div class="badge" data-selected="false" data-category="자기계발">자기계발</div>
                                    <div class="badge" data-selected="false" data-category="종교/역학">종교/역학</div>
                                    <div class="badge" data-selected="false" data-category="청소년">청소년</div>
                                    <div class="badge" data-selected="false" data-category="컴퓨터/모바일">컴퓨터/모바일</div>
                                    <div class="badge" data-selected="false" data-category="유아">유아</div>
                                </div>
                            </div>
                            <!-- <div id="category-error" class="error-message"></div> -->
                            <!-- <button id="save-btn">저장</button> -->
                            <div class="button-group">
                                <!-- 오류 메시지 텍스트 -->
                                <input type="hidden" id="categories" name="categories" value="">
                                <span id="category-error" class="text-danger mt-2" style="display: none;"></span>
                                <!-- 버튼들 나란히 배치 -->
                                <div class="d-flex justify-content-end gap-2">
                                    <button type="button" id="reset-button" class="btn btn-secondary">취소</button>
                                    <button type="submit" id="submit-button" class="btn btn-primary">확인</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-2 border-start border-light"></div> <!-- 오른쪽 구분선 -->
        </div>
    </div>
    <script src="/resources/js/bootstrap.bundle.min.js" defer></script>
    <script src="/resources/js/signup/setPreference.js" defer></script>
</body>
</html>
