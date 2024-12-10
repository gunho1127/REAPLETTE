<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>알림 기능</title>
    <link rel="stylesheet" href="/resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/notification/notificationList.css">
    <link rel="stylesheet" href="/resources/css/headerstyle.css">
</head>
<body>

<header class="header">
    <div class="notification-container">
        <div class="button notification-button">
            <img class="notification-icon" src="/resources/images/notification/bell-icon.png" alt="알림 아이콘">
            <span class="notification-badge">${newNotificationCount}</span> <!-- 새로운 알림 개수 -->
        </div>
        <div class="notification-dropdown ${notifications.isEmpty() ? 'hidden' : ''}">
            <div class="notification-header">
                <span>알림</span>
            </div>
            <ul class="notification-list">
                <!-- 알림 목록 출력 -->
                <c:forEach var="notification" items="${notifications}">
                    <li class="${notification.new ? 'new-notification' : ''}">
                        <span>${notification.message}</span>
                        <span class="delete-icon">×</span>
                    </li>
                </c:forEach>

                <!-- "더보기" 버튼 -->
                <c:if test="${not empty notifications}">
                    <li class="load-more-container">
                        <span class="load-more-notifications">더보기</span>
                    </li>
                </c:if>
            </ul>
        </div>
    </div>
</header>

<script src="/resources/js/bootstrap.bundle.min.js"></script>
<script src="/resources/js/notification/notificationList.js"></script>
</body>
</html>
