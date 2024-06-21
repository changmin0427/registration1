const users = {
    "employee1": "password1",
    "admin": "adminpass"
};

function login(username, password) {
    if (users[username]) {
        if (users[username] === password) {
            createSession(username);
            alert("로그인 성공");
            setTimeout(() => window.location.href = "main.html", 1000); // 로그인 성공 후 1초 후 이동
        } else {
            alert("비밀번호가 잘못되었습니다.");
        }
    } else {
        alert("존재하지 않는 ID입니다.");
    }
}

function logout() {
    destroySession();
    alert("로그아웃 성공");
    setTimeout(() => window.location.href = "index.html", 1000); // 로그아웃 후 1초 후 이동
}
function createSession(username) {
    sessionStorage.setItem("user", username);
    alert(`${username}님, 환영합니다!`); // 사용자에게 환영 메시지 표시
}

function destroySession() {
    sessionStorage.removeItem("user");
    alert("로그아웃 되었습니다."); // 사용자에게 로그아웃 메시지 표시
}

function checkSession() {
    const user = sessionStorage.getItem("user");
    if (user) {
        if (window.location.href.includes("index.html")) {
            alert(`${user}님, 환영합니다!`); // 사용자에게 환영 메시지 표시
            window.location.href = "main.html"; // 로그인 상태에서 로그인 페이지로 접근 시 메인 페이지로 리다이렉트
        }
    } else {
        if (!window.location.href.includes("index.html")) {
            alert("로그인이 필요합니다."); // 비로그인 상태에서 메인 페이지 접근 시 메시지 표시
            window.location.href = "index.html"; // 로그인 페이지로 리다이렉트
        }
    }
}
// register.html로 리다이렉트하는 함수
function redirectToRegister() {
    window.location.href = "/register.html"; // 루트 경로에서 register.html로 이동
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
});

checkSession(); // 페이지 로드 시 세션 확인
