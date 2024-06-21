document.addEventListener("DOMContentLoaded", function() {
    const attendanceList = document.getElementById("attendanceList");

    if (attendanceList) {
        // 출퇴근 기록 로드 예제
        const records = [
            { name: "김철수", status: "출근", time: "09:00" },
            { name: "이영희", status: "지각", time: "09:15" }
        ];

        attendanceList.innerHTML = records.map(record => `
            <p>${record.name} - ${record.status} (${record.time})</p>
        `).join('');
    }
});