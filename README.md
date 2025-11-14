

#  **README.md

```md
#  Task Manager API

Task Manager API, görev oluşturma, listeleme, güncelleme ve silme işlemlerini sağlayan bir RESTful servis örneğidir.  


---

##  Özellikler

- Yeni görev oluşturma (POST)
- Tüm görevleri listeleme (GET)
- Görev güncelleme (PUT)
- Görev silme (DELETE)
- "done" özelliği ile tamamlanma durumu
- Bellek içi (in-memory) veri yönetimi
- Express.js ile hızlı API geliştirme

---

##  Kullanılan Teknolojiler

- **Node.js**
- **Express.js**
- **JavaScript**

---

##  Proje Yapısı

```

task-manager-api/
│── index.js
│── package.json
│── package-lock.json
│── node_modules/
└── README.md

````

---

##  Kurulum

### Repoyu klonla
```bash
git clone https://github.com/kullaniciadiniz/task-manager-api.git
cd task-manager-api
````

### Bağımlılıkları yükle

```bash
npm install
```

### Sunucuyu başlat

```bash
node index.js
```

### API çalışıyor!

```
http://localhost:3000
```

---

## API Endpointleri

###  Tüm görevleri listele

**GET** `/tasks`

**Response:**

```json
[
  {
    "id": 1,
    "title": "Alışveriş yap",
    "description": "Market alışverişi",
    "done": false
  }
]
```

---

### Yeni görev ekle

**POST** `/tasks`

**Body:**

```json
{
  "title": "Alışveriş yap",
  "description": "Market alışverişi"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Alışveriş yap",
  "description": "Market alışverişi",
  "done": false
}
```

---

### Görev güncelle

**PUT** `/tasks/:id`

**Body:**

```json
{
  "title": "Test görevi güncellendi",
  "done": true
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Test görevi güncellendi",
  "description": "Market alışverişi",
  "done": true
}
```

---

###  Görev sil

**DELETE** `/tasks/:id`

**Response:**

```json
{
  "message": "Görev silindi"
}
```

---
##  Geliştirme Planı (TODO)

* [ ] Veritabanı bağlantısı ekle (SQLite veya PostgreSQL)
* [ ] JWT ile kullanıcı doğrulama (auth)
* [ ] Frontend arayüzü (React)
* [ ] Loglama ve hata yönetimi
* [ ] Testler (Jest)

---

##  Amaç

Bu proje backend temellerini öğrenmek, Express.js pratik yapmak ve profesyonel bir GitHub portföyü oluşturmak amacıyla geliştirilmiştir.

---

```

---


```
