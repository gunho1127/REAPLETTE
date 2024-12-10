document.addEventListener('DOMContentLoaded', function () {
    const pwField = document.getElementById('password');
    const confirmPwField = document.getElementById('password-confirm');
    const pwError = document.getElementById('password-error');
    const confirmPwError = document.getElementById('confirm-password-error');
    const clearIconPw = document.getElementById('clear-icon');
    const clearIconConfirmPw = document.getElementById('clear-icon-confirm');
    const togglePw = document.getElementById('toggle-password');

    // 비밀번호 유효성 검사 및 일치 여부 확인
    function validatePassword() {
        const pw = pwField.value.trim();
        const confirmPw = confirmPwField.value.trim();
        let isValid = true;

        // 비밀번호가 비어 있는지 확인
        if (!pw) {
            pwError.textContent = '비밀번호를 입력하세요.';
            pwError.style.display = 'block';
            isValid = false;
        }

        // 비밀번호는 8 ~ 20자에 대소문자, 숫자, 특수문자를 모두 포함
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/.test(pw)) {
            pwError.textContent = '비밀번호는 8 ~ 20자의 영문 대소문자, 숫자, 특수문자를 조합하여 설정하세요.';
            pwError.style.display = 'block';
            isValid = false;
        } else {
            pwError.style.display = 'none'; // 비밀번호 조건 만족 시 에러 메시지 숨김
        }

        // 비밀번호와 확인란 일치 여부 확인
        if (pw !== confirmPw) {
            confirmPwError.textContent = '비밀번호가 일치하지 않습니다.';
            confirmPwError.style.display = 'block';
            isValid = false;
        } else {
            confirmPwError.style.display = 'none'; // 비밀번호 확인란 조건 만족 시 숨김
        }

        console.log("유효성 검사 결과:", isValid);
        return isValid;
    }
    
    // 입력 필드 초기화
    function clearField(field, icon) {
        field.value = '';
        icon.style.display = 'none';
        validatePassword();
    }

    // 비밀번호 토글 버튼 기능
    function togglePwVisibility() {
        // 비밀번호가 숨겨진 상태인지 확인
        const isPwHidden = pwField.type === 'password';

        const newType = isPwHidden ? 'text' : 'password';
        const newIcon = isPwHidden
            ? "/resources/images/signup/open-eye-icon.png" // 텍스트 보이게 할 때 열기 아이콘
            : "/resources/images/signup/closed-eye-icon.png"; // 비밀번호 숨길 때 닫기 아이콘

        // 비밀번호 필드와 비밀번호 확인 필드의 type을 변경
        pwField.type = newType;
        confirmPwField.type = newType;

        // 아이콘 변경
        togglePw.src = newIcon;
    }

    // 클리어 아이콘 클릭 시 입력값 지우기
    clearIconPw.addEventListener('click', () => {
//         pwField.value = '';
//         clearIconPw.style.display = 'none'; // 클리어 아이콘 숨기기
        validatePassword(); // 유효성 검사 다시 실행
    });

    clearIconConfirmPw.addEventListener('click', () => {
//         confirmPwField.value = '';
//         clearIconConfirmPw.style.display = 'none'; // 클리어 아이콘 숨기기
        validatePassword(); // 유효성 검사 다시 실행
    });

    // 비밀번호 입력란에 값이 있으면 클리어 아이콘 보이기
    pwField.addEventListener('input', () => {
//         if (pwField.value) {
//             clearIconPw.style.display = 'block';
//         } else {
//             clearIconPw.style.display = 'none';
//         }
        validatePassword(); // 유효성 검사 실행
    });

    // 비밀번호 확인 입력란에 값이 있으면 클리어 아이콘 보이기
    confirmPwField.addEventListener('input', () => {
//         if (confirmPwField.value) {
//             clearIconConfirmPw.style.display = 'block';
//         } else {
//             clearIconConfirmPw.style.display = 'none';
//         }
        validatePassword(); // 유효성 검사 실행
    });

    togglePw.addEventListener('click', togglePwVisibility);


    // 폼 제출 시 유효성 검사 후 서버로 데이터 전송
    const form = document.getElementById('password-form');
    form.addEventListener('submit', function (event) {
        const isValid = validatePassword();
        if (!isValid) {
            event.preventDefault(); // 유효성 검사 실패 시 제출 방지
            console.log("폼 제출 방지됨 - 유효성 검사 실패");
        } else {
            console.log("폼 제출 성공");
        }
    });
});
