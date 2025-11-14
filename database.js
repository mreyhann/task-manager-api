const sqlite3 = require("sqlite3").verbose();

// Veritabanını oluştur (task.db adlı dosya)
const db = new sqlite3.Database("./task.db", (err) => {
    if (err) {
        console.error("Veritabanı bağlanırken hata:", err.message);
    } else {
        console.log("SQLite veritabanına bağlanıldı.");
    }
});

// Tabloları oluştur
db.serialize(() => {

    // Görev tablosu
    db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        done INTEGER DEFAULT 0,
        user_id INTEGER
    )
`);


    // Kullanıcı tablosu
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

});

module.exports = db;
