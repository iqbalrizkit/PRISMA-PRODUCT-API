# Laporan Evidence — Products API dengan PostgreSQL dan Prisma

**Nama:** ................................................  
**NRP:** ................................................  
**Kelas:** ..............................................  
**Repository GitHub:** ..................................

## 1. Implementasi

Project API produk dikembangkan dari Express.js yang sebelumnya menyimpan data pada array menjadi menggunakan PostgreSQL sebagai database dan Prisma ORM sebagai penghubung aplikasi dengan database. Endpoint yang disediakan meliputi GET, POST, PUT, dan DELETE.

## 2. Evidence pengujian API

Tambahkan screenshot asli dari Postman, Bruno, atau Hoppscotch pada bagian di bawah ini. Pastikan method, URL, request body (jika ada), status code, dan response terlihat.

### 2.1 GET seluruh produk — 200 OK

**Screenshot:** [Tempel screenshot di sini]

**Hasil:** Endpoint menampilkan seluruh data produk yang tersimpan pada PostgreSQL.

### 2.2 POST produk baru — 201 Created

**Request body:**
```json
{"name":"Penggaris","price":7000}
```

**Screenshot:** [Tempel screenshot di sini]

**Hasil:** Produk baru berhasil disimpan dan memperoleh ID dari database.

### 2.3 POST gagal validasi — 400 Bad Request

**Request body:**
```json
{"name":"Penghapus"}
```

**Screenshot:** [Tempel screenshot di sini]

**Hasil:** Request ditolak karena field price tidak dikirim.

### 2.4 PUT memperbarui produk — 200 OK

**URL:** `PUT /products/1`

**Request body:**
```json
{"id":1,"name":"Buku Tulis","price":18000}
```

**Screenshot:** [Tempel screenshot di sini]

**Hasil:** Data produk dengan ID 1 berhasil diperbarui.

### 2.5 PUT produk tidak ditemukan — 404 Not Found

**URL:** `PUT /products/999`

**Request body:**
```json
{"id":999,"name":"Produk Uji","price":10000}
```

**Screenshot:** [Tempel screenshot di sini]

**Hasil:** API mengembalikan 404 karena produk dengan ID tersebut tidak tersedia.

### 2.6 DELETE produk — 200 OK

**URL:** `DELETE /products/1`

**Screenshot:** [Tempel screenshot di sini]

**Hasil:** Produk dengan ID 1 berhasil dihapus.

### 2.7 DELETE produk tidak ditemukan — 404 Not Found

**URL:** `DELETE /products/999`

**Screenshot:** [Tempel screenshot di sini]

**Hasil:** API mengembalikan 404 karena produk tidak ditemukan.

## 3. Evidence perubahan database

Ambil screenshot Prisma Studio untuk model `Product`. Gunakan record yang sama agar perubahan sebelum dan sesudah dapat dibandingkan.

### 3.1 Kondisi database sebelum POST

**Screenshot:** [Tempel screenshot Prisma Studio sebelum POST]

### 3.2 Kondisi database sesudah POST

**Screenshot:** [Tempel screenshot Prisma Studio sesudah POST]

**Perubahan:** Record produk baru bertambah pada tabel Product.

### 3.3 Kondisi database sesudah PUT

**Screenshot:** [Tempel screenshot Prisma Studio sesudah PUT]

**Perubahan:** Nilai name dan price pada record dengan ID yang diuji berubah.

### 3.4 Kondisi database sesudah DELETE

**Screenshot:** [Tempel screenshot Prisma Studio sesudah DELETE]

**Perubahan:** Record dengan ID yang dihapus tidak lagi muncul pada tabel Product.

## 4. Kesimpulan

Pengembangan ini mengubah penyimpanan data dari array di dalam proses Express menjadi PostgreSQL yang diakses menggunakan Prisma ORM. API mendukung operasi membaca, menambahkan, memperbarui, dan menghapus data produk. Validasi request juga diterapkan untuk menangani input yang tidak sesuai dan data yang tidak ditemukan.
