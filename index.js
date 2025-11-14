const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ---- Bellekte tutulan tasks listesi ----
let tasks = [];

// ---- 1) Tüm görevleri listele ----
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ---- 2) Yeni görev ekle ----
app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title gerekli!" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description: description || "",
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});
// ---- 4) Görev güncelle ----
app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, done } = req.body;

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Görev bulunamadı" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (done !== undefined) task.done = done;

    res.json(task);
});

// ---- 3) Görev sil ----
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);

    tasks = tasks.filter(task => task.id !== taskId);

    res.json({ message: "Görev silindi" });
});

// ---- Sunucu ----
app.get("/", (req, res) => {
    res.send("Task Manager API çalışıyor 🚀");
});

app.listen(PORT, () => {
    console.log("Server çalışıyor → http://localhost:" + PORT);
});
