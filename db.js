const mysql = require('mysql');

// MySQL 데이터베이스 연결
const connection = mysql.createConnection({
    host: 'localhost', // MySQL 서버 호스트
    user: 'root', // MySQL 사용자 이름
    password: '464712', // MySQL 비밀번호
    database: 'employee_management' // 사용할 데이터베이스 이름
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err.message);
    } else {
        console.log('MySQL 연결 성공');
    }
});

module.exports = connection;