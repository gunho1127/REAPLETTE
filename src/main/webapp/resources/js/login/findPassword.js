    const form = document.getElementById("find-password-form");
    const idInput = document.getElementById("id").value;
    const errorElement = document.getElementById("error-message");
    const submitButton = document.getElementById("reset-password-button");
    const popup = document.getElementById("popup-message");
    const popupText = document.getElementById("popup-text");
    const popupButton = document.getElementById("popup-button");


    function resetPassword() {
        // fetch 요청 보내기
        fetch('/login/findPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: idInput // idInput을 텍스트 데이터로 전송
        })
        .then(response => {
            
            if (!response.ok) {                            
                throw new Error(`HTTP error! status: ${response.status}`);
            }            
            return response.json();
        })
        .then(data => {
            if (data.success) {
                
                // 성공 시 팝업을 표시하고 페이지 리디렉션
                const popup = document.getElementById("popup-message");
                popup.style.display = "flex"; // 팝업 요소를 보이도록 설정                
            } else {
                
                // 실패 시 예외 메시지를 표시
                const exception = document.getElementById("exception");
                exception.innerHTML = "재설정 이메일 전송 실패.";
                exception.style.color = "red"; // 스타일을 설정                
            }
        })
        .catch(error => {
            
            console.error('서버와의 통신 오류:', error);
            // 서버 오류 시 예외 메시지를 표시
            const exception = document.getElementById("exception");
            exception.innerHTML = "비밀번호 재설정 요청 중 문제가 발생했습니다.";
            exception.style.color = "red"; // 스타일을 설정            
        });
    }

    // 팝업 표시 함수
    function showPopup(message) {
        popupText.textContent = message; // 팝업 메시지 설정
        popup.style.display = "flex"; // 팝업 보이기
    }

     // 팝업 닫기 버튼 동작
     popupButton.addEventListener("click", () => {
         popup.style.display = "none";
         window.location.href = "/login/enterPassword";
     });

    // 오류 메시지 처리 함수
    function showError(message) {
        errorElement.textContent = message;  // 오류 메시지 설정
        errorElement.style.display = 'block'; // 요소 보이기
        setTimeout(() => {
            clearError(); // 3초 후 clearError 호출
        }, 3000);
    }

    function clearError() {
        errorElement.textContent = ''; // 텍스트 초기화
        errorElement.style.display = 'none'; // 오류 메시지 숨기기
    }

