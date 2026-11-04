# Products API (Express, PostgreSQL, dan Prisma)

Project ini merupakan pengembangan dari tugas API produk sebelumnya. Penyimpanan data yang semula menggunakan array JavaScript diganti menjadi PostgreSQL melalui Prisma ORM.

## Fitur API

| Method | Endpoint | Fungsi | Sukses |
|---|---|---|---|
| GET | `/products` | Menampilkan seluruh produk | 200 |
| GET | `/products/:id` | Menampilkan satu produk | 200 / 404 |
| POST | `/products` | Membuat produk | 201 |
| PUT | `/products/:id` | Memperbarui produk berdasarkan ID | 200 / 404 |
| DELETE | `/products/:id` | Menghapus produk berdasarkan ID | 200 / 404 |

Body POST:
```json
{
  "name": "Penggaris",
  "price": 7000
}
```

Body PUT (ID pada body bersifat tambahan dan harus sama dengan ID pada URL jika dikirim):
```json
{
  "id": 1,
  "name": "Buku Tulis",
  "price": 18000
}
```

Validasi menolak nama kosong/non-string, harga non-number, harga negatif, dan ID yang tidak valid. Produk yang tidak ditemukan menghasilkan 404.

## Persiapan

Persyaratan: Node.js 20.19+ (atau versi yang didukung Prisma 7), npm, dan PostgreSQL.

1. Buat database PostgreSQL bernama `products_db` (misalnya melalui pgAdmin atau psql).
2. Salin `.env.example` menjadi `.env`.
3. Sesuaikan `DATABASE_URL` dengan username, password, host, port, dan nama database lokal.
4. Pasang dependency:

```bash
npm install
```

5. Buat Prisma Client:

```bash
npx prisma generate
```

6. Terapkan migration ke database:

```bash
npx prisma migrate dev --name init
```

Jika migration awal pada folder `prisma/migrations/20261104000000_init` sudah terdeteksi, perintah tersebut akan menerapkannya. Jangan jalankan SQL migration secara manual jika menggunakan Prisma Migrate.

7. Masukkan dua data awal dari project sebelumnya (Buku dan Pulpen):

```bash
npm run db:seed
```

8. Jalankan API:

```bash
npm start
```

Server tersedia pada `http://localhost:3000`.

## Melihat database dengan Prisma Studio

```bash
npx prisma studio --port 51212
```

Buka `http://localhost:51212`, lalu pilih model `Product`.

## Pengujian dengan Postman / Bruno / Hoppscotch

Pilih Body → raw → JSON untuk request POST dan PUT.

### 1. GET seluruh produk
- Method: `GET`
- URL: `http://localhost:3000/products`
- Harapan: `200 OK`, response berupa array.

### 2. POST produk berhasil
- Method: `POST`
- URL: `http://localhost:3000/products`
- Body:
```json
{"name":"Penggaris","price":7000}
```
- Harapan: `201 Created`, produk baru memiliki ID dari PostgreSQL.

### 3. POST gagal validasi
- Method: `POST`
- URL: `http://localhost:3000/products`
- Body:
```json
{"name":"Penghapus"}
```
- Harapan: `400 Bad Request`.

### 4. PUT memperbarui produk
- Method: `PUT`
- URL: `http://localhost:3000/products/1`
- Body:
```json
{"id":1,"name":"Buku Tulis","price":18000}
```
- Harapan: `200 OK`, nilai produk ID 1 berubah.

### 5. PUT produk tidak ditemukan
- Method: `PUT`
- URL: `http://localhost:3000/products/999`
- Body:
```json
{"id":999,"name":"Produk Uji","price":10000}
```
- Harapan: `404 Not Found`.

### 6. DELETE menghapus produk
- Method: `DELETE`
- URL: `http://localhost:3000/products/1`
- Harapan: `200 OK`, produk dihapus.

### 7. DELETE produk tidak ditemukan
- Method: `DELETE`
- URL: `http://localhost:3000/products/999`
- Harapan: `404 Not Found`.

### 8. GET setelah DELETE
- Method: `GET`
- URL: `http://localhost:3000/products/1`
- Harapan: `404 Not Found`.

## Evidence laporan yang perlu diambil

Ambil screenshot nyata dari aplikasi pengujian dan Prisma Studio. Jangan menggunakan contoh response di README sebagai pengganti screenshot.

1. GET `/products` — response 200.
2. POST `/products` — response 201.
3. POST `/products` dengan field `price` hilang — response 400.
4. PUT `/products/1` — response 200.
5. PUT `/products/999` — response 404.
6. DELETE `/products/1` — response 200.
7. DELETE `/products/999` — response 404.
8. Prisma Studio sebelum perubahan dan sesudah POST, PUT, serta DELETE. Tampilkan perubahan record yang sama agar perbandingan before-after jelas.

## Struktur project

```text
products-api/
├── prisma/
│   ├── migrations/
│   │   ├── 20261104000000_init/migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── src/
│   ├── controllers/productController.js
│   ├── lib/prisma.js
│   ├── routes/productRoutes.js
│   └── app.js
├── .env.example
├── .gitignore
├── prisma.config.js
├── package.json
└── README.md
```

## Catatan keamanan

File `.env` berisi kredensial database dan tidak boleh diunggah ke GitHub. Unggah `.env.example` saja.
