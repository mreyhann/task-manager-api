const express = require("express");
const app = express();
const PORT = 3000;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("./database");

app.use(express.json());

// ---- Auth Middleware ----
function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token gerekli" });
    }

    jwt.verify(token, "SECRET_KEY", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Geçersiz token" });
        }
        req.user = user;
        next();
    });
}

// ---- Kullanıcı kayıt ----
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(sql, [username, hashedPassword], function(err) {
        if (err) {
            return res.status(400).json({ message: "Kullanıcı zaten var" });
        }

        res.status(201).json({ message: "Kayıt başarılı" });
    });
});

// ---- Kullanıcı giriş ----
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: "Geçersiz kullanıcı" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Şifre yanlış" });
        }

        const token = jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "1h" });

        res.json({ token });
    });
});

// ---- Tüm görevleri listele ----
app.get("/tasks", authenticate, (req, res) => {
    const userId = req.user.id;

    db.all("SELECT * FROM tasks WHERE user_id = ?", [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// ---- Yeni görev ekle ----
app.post("/tasks", authenticate, (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ message: "Title gerekli!" });
    }

    const sql = "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)";
    db.run(sql, [title, description || "", userId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            title,
            description,
            done: 0,
            user_id: userId
        });
    });
});

// ---- Görev güncelle ----
app.put("/tasks/:id", authenticate, (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    db.get("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, userId], (err, task) => {
        if (!task) {
            return res.status(403).json({ message: "Bu görev sana ait değil!" });
        }

        const { title, description, done } = req.body;

        const sql = `
            UPDATE tasks 
            SET title = ?, description = ?, done = ?
            WHERE id = ? AND user_id = ?
        `;

        db.run(sql, [title, description, done, id, userId], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ message: "Görev güncellendi" });
        });
    });
});

// ---- Görev sil ----
app.delete("/tasks/:id", authenticate, (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    db.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [id, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(403).json({ message: "Bu görevi silme yetkin yok!" });
        }

        res.json({ message: "Görev silindi" });
    });
});

// ---- Sunucuyu başlat ----
app.listen(PORT, () => {
    console.log("Server çalışıyor → http://localhost:" + PORT);
});
