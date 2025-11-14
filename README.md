Task Manager API

Task Manager API, kullanıcı kimlik doğrulaması (JWT), görev yönetimi (CRUD) ve SQLite veritabanı kullanan basit ama profesyonel bir backend uygulamasıdır.
Backend geliştirmeye başlamak ve portföy oluşturmak isteyenler için gerçek bir API yapısına sahiptir.

Özellikler

Kullanıcı kayıt (Register)

Kullanıcı girişi (Login) ve JWT token üretimi

Kimlik doğrulama (JWT Middleware)

Görev oluşturma (Create)

Görev listeleme (Read)

Görev güncelleme (Update)

Görev silme (Delete)

Kullanıcıya ait görevlerin izole şekilde listelenmesi

Güvenli şifre saklama (bcrypt)

SQLite ile kalıcı veri yönetimi

Kullanılan Teknolojiler

Node.js

Express.js

SQLite

JWT (jsonwebtoken)

bcrypt.js

Kurulum
1. Projeyi klonlayın
git clone https://github.com/KULLANICI_ADINIZ/task-manager-api.git
cd task-manager-api

2. Gerekli paketleri yükleyin
npm install

3. Veritabanı dosyasını sıfırlamak isterseniz
del task.db   # Windows
rm task.db    # Mac / Linux


Yeni dosya uygulama çalıştığında otomatik oluşacaktır.

4. Sunucuyu başlatın
node index.js


Çıktı:

Server çalışıyor → http://localhost:3000
SQLite veritabanına bağlanıldı.

Kimlik Doğrulama Bilgisi

Bu API’de görev oluşturma, listeleme, güncelleme ve silme işlemleri JWT token gerektirir.

Header formatı:

Authorization: Bearer TOKEN

API Endpointleri
Register

POST /register

{
  "username": "reyhan",
  "password": "12345"
}

Login

POST /login

Örnek cevap:

{
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}

Görev Listeleme

GET /tasks
Sadece giriş yapan kullanıcının görevleri listelenir.

Görev Oluşturma

POST /tasks

{
  "title": "Alışveriş",
  "description": "Meyve ve sebze al"
}

Görev Güncelleme

PUT /tasks/:id

Görev Silme

DELETE /tasks/:id

Proje Yapısı
task-manager-api/
│
├── index.js
├── database.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

Geliştirme Yol Haritası

Görevler için created_at ve updated_at alanlarının eklenmesi

Görev tamamlama durumuna göre filtreleme

Kullanıcı e-posta doğrulaması

PostgreSQL veya MongoDB'ye geçiş

Frontend (React) arayüzünün eklenmesi

Docker ile container yapılandırması

Geliştirici

Meryem Reyhan Dereköy