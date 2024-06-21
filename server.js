const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./db');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // public 폴더를 정적 파일 제공 폴더로 설정

// 직원 등록 API
app.post('/register', (req, res) => {
    const { id, password, name, joinDate } = req.body;

    if (!id || !password || !name || !joinDate) {
        return res.status(400).json({ success: false, message: '모든 필드를 입력해야 합니다.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO employees (id, password, name, join_date) VALUES (?, ?, ?, ?)`;
    db.query(query, [id, hashedPassword, name, joinDate], (err) => {
        if (err) {
            console.error('직원 등록 오류:', err.message);
            return res.status(500).json({ success: false, message: '데이터베이스 오류가 발생했습니다.' });
        }
        res.json({ success: true });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});