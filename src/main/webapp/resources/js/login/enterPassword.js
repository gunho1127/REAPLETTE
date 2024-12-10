document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const pwField = document.getElementById('password');
    const errorElement = document.getElementById('password-error');
    const idField = document.getElementById('id');
    const forgotPasswordButton = document.getElementById('forgot-button');
    const submitButton = document.getElementById('start-button');

    // 엔터키 동작 제어
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 동작 방지
            if (document.activeElement !== forgotPasswordButton) {
                submitButton.click();
            }
        }
    });

    // 폼 제출 이벤트 처리
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // 기본 제출 동작 방지

        const id = idField.value; // readonly 이메일 값 가져오기
        const pw = pwField.value; // 비밀번호 값 가져오기

        if (!validatePassword()) return; // 비밀번호 유효성 검사 실패 시 중단

        loginRequest(id, pw); // 서버로 로그인 요청
    });

    // 비밀번호 유효성 검사
    function validatePassword() {
        pwField.value = pwField.value.replace(/\s/g, ''); // 공백 제거

        const pw = pwField.value.trim();
        if (!pw) {
            showError('비밀번호를 입력하지 않았습니다.');
            return false;
        }
        clearError();
        return true; // 유효한 비밀번호일 경우 true 반환
    }

    // 비밀번호 입력 시 유효성 검사
    pwField.addEventListener('input', validatePassword);

    // 비밀번호 찾기 버튼 클릭 시 페이지 이동 처리
    forgotPasswordButton.addEventListener('click', (event) => {
        event.preventDefault(); // 기본 폼 동작 방지
        window.location.href = '/login/findPassword'; // 비밀번호 찾기 페이지로 이동
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

    // X 아이콘 클릭 시 입력값 비우기
    clearIcon.addEventListener("click", () => {
        idInput.value = "";
        clearIcon.style.display = "none";
        clearError();
    });

    // 서버로 로그인 요청
    async function loginRequest(id, pw) {
        try {
            const response = await fetch('/login/enterPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, pw }) // JSON 형식으로 ID와 비밀번호 전송
            });

            const data = await response.json();

            if (response.ok && data.redirect) {
                // 로그인 성공 시 리디렉션 및 사용자 정보 저장
                window.location.href = data.redirect; // 메인 페이지로 이동
            } else if (data.error) {
                // 서버에서 제공한 에러 메시지 표시
                showError(data.error);
            } else {
                // 기본 오류 메시지
                showError('비밀번호가 일치하지 않습니다. 다시 입력하세요.');
            }
        } catch (error) {
            console.error('서버와의 통신 오류:', error);
            showError('서버와 통신 중 오류가 발생했습니다. 다시 시도하세요.');
        }
    }
});
