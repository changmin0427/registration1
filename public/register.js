document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    // 입력된 데이터 가져오기
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const joinDate = document.getElementById('joinDate').value;

    // 데이터 유효성 검사
    if (!id || !password || !name || !joinDate) {
        displayMessage('모든 필드를 채워주세요.', 'error');
        return;
    }

    // 서버에 데이터 전송
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, password, name, joinDate }) // JSON 데이터 전송
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('서버 응답이 올바르지 않습니다.');
        }
        return response.json(); // JSON 응답 파싱
    })
    .then(data => {
        if (data.success) {
            displayMessage('직원이 성공적으로 등록되었습니다.', 'success');
        } else {
            displayMessage(`오류 발생: ${data.message}`, 'error');
        }
    })
    .catch(error => {
        displayMessage(`오류 발생: ${error.message}`, 'error');
    });
});

// 메시지 표시 함수
function displayMessage(message, type) {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.textContent = message;
    resultMessage.className = type; // success 또는 error 클래스 추가
}
