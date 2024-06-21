document.addEventListener("DOMContentLoaded", function() {
    const calendarBody = document.getElementById("calendarBody");
    if (calendarBody) {
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        
        const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const leaveRequests = [
            { date: "2024-07-05", name: "김철수" },
            { date: "2024-07-12", name: "이영희" },
            { date: "2024-07-20", name: "박준형" }
        ];

        function renderCalendar(month, year) {
            calendarBody.innerHTML = "";
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            document.getElementById("calendarTitle").innerText = `${months[month]} ${year}`;

            for (let i = 0; i < firstDay; i++) {
                calendarBody.innerHTML += `<div class="day"></div>`;
            }
            
            for (let day = 1; day <= daysInMonth; day++) {
                let dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                let leaveInfo = leaveRequests.filter(lr => lr.date === dateStr)
                                             .map(lr => `<div class="event">${lr.name}</div>`)
                                             .join('');
                calendarBody.innerHTML += `<div class="day">
                    <div class="date">${day}</div>
                    ${leaveInfo}
                </div>`;
            }
        }

        renderCalendar(currentMonth, currentYear);

        document.querySelector(".calendar-header button:nth-child(1)").onclick = function() {
            if (currentMonth === 0) {
                currentMonth = 11;
                currentYear -= 1;
            } else {
                currentMonth -= 1;
            }
            renderCalendar(currentMonth, currentYear);
        };

        document.querySelector(".calendar-header button:nth-child(3)").onclick = function() {
            if (currentMonth === 11) {
                currentMonth = 0;
                currentYear += 1;
            } else {
                currentMonth += 1;
            }
            renderCalendar(currentMonth, currentYear);
        };
    }
});