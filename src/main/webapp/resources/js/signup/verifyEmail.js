//document.addEventListener("DOMContentLoaded", () => {
    const verifyButton = document.getElementById("verify-button");
//    console.log("버튼 찾기:", verifyButton);
    const submitButton = document.getElementById("start-button");
    const errorElement = document.getElementById("verification-error");
    const timerElement = document.getElementById("timer");
    const clearIcon = document.getElementById("clear-icon");
    const verifyEmailMsg = document.getElementById("verify-email-msg"); // 인증번호 발송 메시지

    let verificationCode = document.getElementById("verificationCode").value.trim();
    let codeField = document.getElementById("verification-code");

    let timerInterval;
    let codeCheck = false;

    startTimer(20); // 20초

    // 타이머 시작
    function startTimer(duration) {
        let timeRemaining = duration;

        if (timerInterval) clearInterval(timerInterval);

        // 타이머 값을 즉시 업데이트
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        // 1초 간격으로 업데이트
        timerInterval = setInterval(async () => {
            timeRemaining--;

            if (timeRemaining < 0) {
                clearInterval(timerInterval);
                switchToResendButton(); // 타이머 종료 후 버튼 전환

                // 서버에 인증번호 만료 상태 전송
                try {
                    await fetch("/signup/expireVerificationCode", { method: "POST" });
                } catch (error) {
                    console.error("인증번호 만료 상태 전송 중 오류:", error);
                }
            } else {
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            }
        }, 1000);
    }

    // 확인 버튼으로 복귀
    function switchToVerifyButton() {
        verifyButton.textContent = "확인";
//        verifyButton.setAttribute("data-state", "verify"); // 버튼 상태 변경
        verifyButton.classList.remove("btn-warning");
        verifyButton.classList.add("btn-primary");
        verifyButton.disabled = false;
        console.log("버튼이 '확인'으로 전환되었습니다."); // 확인 로그
    }

    // 확인 버튼을 재발송 버튼으로 변경
    function switchToResendButton() {
        verificationCode = ""; // 인증번호 초기화
        codeField.value = ""; // 입력란 초기화
        verifyButton.textContent = "재발송";
//        verifyButton.setAttribute("data-state", "resend"); // 버튼 상태 변경
        showError("인증번호가 유효하지 않습니다. 새 인증번호를 요청하세요.", true);
        verifyButton.classList.remove("btn-primary");
        verifyButton.classList.add("btn-warning");
        verifyButton.disabled = false;
    }

    // 인증번호 확인 버튼 클릭 시
    function verifyCodeCheck() {
        console.log("verifyCodeCheck 함수 호출됨");
        const code = codeField.value.trim();
        console.log("verifyCodeCheck 함수 호출됨");

        if (verifyButton.textContent === "재발송") {
            location.reload(true);
            return;
        }

        if (!code) {
            showError("인증번호를 입력하지 않았습니다.", true);
            return;
        }

        if(verificationCode == code) {
            codeCheck = true;
            showError("인증번호를 확인했습니다. 회원가입 버튼을 누르세요.", false);
        } else {
            showError("인증번호가 일치하지 않습니다. 다시 입력하세요.", true);
        }
    }

//    // 재발송 버튼 클릭 시 새로운 인증번호 요청
//    function verifyButtonClickHandler() {
//        console.log("버튼 클릭 이벤트 발생");
//        const currentState = verifyButton.getAttribute("data-state");
//        console.log("현재 버튼 상태: ", currentState);
//
//        if (currentState === "resend") {
//            handleResendRequest();
//        } else if (currentState === "verify") {
//            verifyCodeCheck();
//        }
//    }

    verifyButton.addEventListener("click", async () => {
            const code = codeField.value.trim();
//            const currentState = verifyButton.getAttribute("data-state");
        if (verifyButton.textContent === "재발송") {
        console.log("재발송 버튼 클릭됨"); // 디버깅용

            try {
                const response = await fetch("/signup/resendVerification", { method: "POST" });
                console.log("서버 응답 수신 완료:", response.status); // 디버깅용

                if (response.ok) {
                    const result = await response.json();
                    console.log("서버 응답 내용:", result); // 응답 내용 확인
                    verificationCode = result.newCode; // 새 인증번호 갱신
                    console.log("새 인증번호:", verificationCode); // 디버깅용
                    showError("새 인증번호가 발송되었습니다. 이메일을 확인하세요.", false);
                    switchToVerifyButton(); // 버튼을 "확인" 상태로 변경
                } else {
                    console.error("오류 메시지:", result.message); // 디버깅용
                    showError("재발송 중 오류가 발생했습니다.", true);
                }
            } catch (error) {
                console.error("재발송 요청 중 오류 발생:", error); // 디버깅용
                showError("인증번호 재발송 중 문제가 발생했습니다.", true);
            }
        } else {
            verifyCodeCheck();
        }
    });

//    verifyButton.addEventListener("click", async () => {
////        console.log("버튼 클릭 이벤트 동작 확인");
//        if (verifyButton.textContent === "재발송") {
//            try {
////              console.log("재발송 버튼으로 서버에 요청");
//                const email = sessionStorage.getItem("id");
//
//                const response = await fetch("/signup/resendVerification", {
//                    method: "POST",
//                    headers: { "Content-Type": 'application/json' },
//                    body: JSON.stringify({ id: email })
//                });
//
//                if (response.ok) {
//                    const result = await response.json(); // JSON 응답 파싱
//                    verificationCode = result.newCode; // 새 인증번호 갱신
//                    showError(message, false);
//                    switchToVerifyButton(); // 버튼을 "확인" 상태로 변경
//                } else {
////                console.log("서버 응답 상태 코드:", response.status);
//                    const message = await response.text();
//                    showError(message, true);
////                console.log("서버 응답 메시지:", message);
//                }
//            } catch (error) {
//                console.error("재발송 요청 중 오류 발생:", error);
//                showError("인증번호 재발송 중 문제가 발생했습니다.", true);
//            }
//        }
//    });

    codeField.addEventListener("keydown", (event) => {
        if (
            !(event.key >= "0" && event.key <= "9") &&
            !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(event.key)
        ) {
            event.preventDefault(); // 숫자와 제어 키 외 입력 차단
        }
    });

    // 오류 메시지 표시 함수
    function showError(message, isError) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
        errorElement.style.color = isError ? "#DA1E28" : "#0F62FE";
        setTimeout(clearError, 3000); // 3초 후 메시지 제거

    }

    function clearError() {
        errorElement.textContent = ''; // 텍스트 초기화
        errorElement.style.display = "none";
    }

    // 예외 처리 함수
    function handleException(message, error) {
    //    console.error(message, error);
        showError(`${message}: ${error.message}`, true);
    }

    // 입력란에 값이 있을 때 클리어 아이콘 보이기
    codeField.addEventListener("input", () => {
        clearIcon.style.display = codeField.value ? "block" : "none";
    });

    // 클리어 아이콘 클릭 시 입력란 초기화
    clearIcon.addEventListener("click", () => {
        codeField.value = "";
        clearIcon.style.display = "none";
        clearError();
    });

    // 입력란에 값이 있을 때 클리어 아이콘 보이기
    codeField.addEventListener("input", () => {
        clearIcon.style.display = codeField.value ? "block" : "none";
    });

    // 인증번호 입력란에 포커스가 가면 클리어 아이콘 보이기
    codeField.addEventListener('focus', () => {
    //    const clearIcon = document.getElementById('clear-icon');
        clearIcon.style.display = 'block'; // 포커스 시 클리어 아이콘 보이기
    });

    // 인증번호 입력란에 포커스가 벗어나면 클리어 아이콘 숨기기
    codeField.addEventListener('blur', () => {
    //    const clearIcon = document.getElementById('clear-icon');
        if (codeField.value) {
            clearIcon.style.display = 'none'; // 입력란이 비어있으면 클리어 아이콘 숨기기
        }
    });

    document.getElementById("verify-form").addEventListener("submit", function(event) {
        if (!codeCheck) {
            showError("인증번호를 확인하지 않았습니다.", true);
            event.preventDefault(); // 폼 제출 방지
            return;
        } else {
            console.log("폼 제출 성공: codeCheck =", codeCheck);
        }
    });
//});
