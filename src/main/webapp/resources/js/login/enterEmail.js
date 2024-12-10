const form = document.getElementById("login-form");
const errorElement = document.getElementById("email-error");
const clearIcon = document.getElementById("clear-icon");
const submitButton = document.getElementById("start-button");
const idInput = document.getElementById("id");

form.addEventListener("submit", async (event) => {         
    event.preventDefault(); // 폼 기본 제출 동작 방지            

    const idInput = document.getElementById("id").value.trim();
    let message = ""; // 메세지 초기화
    let plag = false; // TRUE 일 때 폼이 제출됩니다.
    let loginTypeCheck = false; // TRUE 일 때 폼이 제출됩니다.                        

    // 아무 값도 입력하지 않았을 때
    if (idInput == '') {
        
        message = "이메일을 입력하지 않았습니다.";                        
        showError(message);            
    } 

    // 입력 유효성 검사에서 벗어났을 때
    else if (idInput !== '' && !validateEmail(idInput)) {
        
        message = "올바른 이메일 형식이 아닙니다.";                            
        showError(message);
    }
    else {
        plag = true;        
    }

    // 네이버 회원 체크
    if (!loginTypeCheck && plag==true) {
        try {
            const url = `/login/loginTypeCheck?id=${encodeURIComponent(idInput)}`;
            const response = await fetch(url, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            loginTypeCheck = data.isNaver; // 서버에서 네이버 회원 여부 반환

            if (loginTypeCheck) {
                message = "소셜 가입자입니다. 네이버로 로그인하세요.";
                showError(message);
            } else {
                loginTypeCheck = true; // 네이버 회원이 아닌 경우
            }
        } catch (error) {
            console.error("AJAX 요청 중 오류 발생:", error);
        }
    }                    

    if (plag && loginTypeCheck) {
        form.submit(); // 폼 제출
    }
});

// 유효성 검사 함수
function validateEmail(id) {
    const emailRegex = /^(?!.*\.\.)(?!\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(id);
}

// 오류 메시지 처리 함수
function showError(message) {    
    errorElement.innerHTML = message;  // 오류 메시지 설정    
    setTimeout(() => {
        clearError(); // 3초 후 clearError 호출
    }, 3000);
}

// 클리어 아이콘 클릭 시 입력값 비우기
clearIcon.addEventListener("click", () => {
    idInput.value = "";
    clearIcon.style.display = "none";
    clearError();
});

function clearError() {
    errorElement.textContent = ''; // 텍스트 초기화
}

idInput.addEventListener("input", () => {
    clearIcon.style.display = idInput.value ? "block" : "none";
});
