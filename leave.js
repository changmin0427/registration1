let leaveRequests = [];

function requestLeave(reason) {
    const leaveRequest = {
        id: leaveRequests.length + 1,
        reason: reason,
        status: "대기 중"
    };
    leaveRequests.push(leaveRequest);
    displayLeaveRequests();
}

function approveLeave(requestId) {
    updateLeaveStatus(requestId, "승인됨");
}

function rejectLeave(requestId) {
    updateLeaveStatus(requestId, "반려됨");
}

function updateLeaveStatus(requestId, status) {
    const request = leaveRequests.find(req => req.id === requestId);
    if (request) {
        request.status = status;
        displayLeaveRequests();
    }
}

function displayLeaveRequests() {
    const leaveRequestContainer = document.getElementById("leaveRequests");
    leaveRequestContainer.innerHTML = leaveRequests.map(req => 
        `<div>ID: ${req.id}, 사유: ${req.reason}, 상태: ${req.status}
        ${isAdmin() ? 
            `<button onclick="approveLeave(${req.id})">승인</button>
            <button onclick="rejectLeave(${req.id})">반려</button>` : 
            '<p>권한 없음</p>'}
        </div>`
    ).join("");
}

function isAdmin() {
    const user = sessionStorage.getItem("user");
    return user === "admin"; // 관리자 여부 확인
}

document.getElementById("leaveForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const reason = document.getElementById("leaveReason").value;
    requestLeave(reason);
    document.getElementById("leaveReason").value = ""; // 폼 초기화
});