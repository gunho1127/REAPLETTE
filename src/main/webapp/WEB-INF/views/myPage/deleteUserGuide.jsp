<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">


      <link rel="stylesheet" href="../../../resources/css/myPage/deleteUserGuidestyle.css">


      <style>
        a,
        button,
        input,
        select,
        h1,
        h2,
        h3,
        h4,
        h5,
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: none;
          text-decoration: none;
          background: none;

          -webkit-font-smoothing: antialiased;
        }

        menu,
        ol,
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
      </style>
      <title>Document</title>
    </head>

    <body>
      <div class="div">
        <!-- nav -->
        <jsp:include page="/WEB-INF/views/includes/mypagenav/myPageNav.jsp" />
        <!-- nav -->


        <div class="table">
          <div class="header">
            <span>
              <span class="div-22-span">
                회원탈퇴
                <br />
              </span>
              <span class="div-22-span2">정말 탈퇴하시겠습니까 ?</span>
            </span>
          </div>





          <div class="page-content">
            <img class="icon-jam-icons-outline-logos-rocket"
              src="../../../resources/images/myPage/icon-jam-icons-outline-logos-rocket0.svg" />
            <div class="section-text">
              <div class="top">
                <div class="main-headline">회원탈퇴</div>
                <div class="secondary-headline">안내문을 읽어주세요</div>
              </div>
              <div class="paragraph">
                '리플렛' 서비스를 이용해주셔서 감사합니다. 회원 탈퇴를 진행하시면<br>회원 정보는 복구되지 않으며 모든 개인화된 추천 내역도 삭제됩니다.<br>탈퇴 후에는 더 이상 맞춤형 도서
                추천 서비스를 제공받으실 수 없으니<br>신중히 결정해 주시기 바랍니다.탈퇴 후에도 언제든지 재가입이 가능하니<br>필요하시다면 다시 찾아주시면 감사하겠습니다.


              </div>
            </div>
            <div class="button" >
              <div class="text-container">
                <form action="/myPage/deleteUser" method="post">
                  <input type="submit" value="탈퇴하기" class="div3" style="cursor: pointer;"/>
                  <input type="hidden" name="id" value="${user.id}" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>

    </body>

    </html>