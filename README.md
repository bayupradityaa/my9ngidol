# My 9 Ngidol

Pilih **9 oshi JKT48**-mu, susun jadi formasi 3x3, lalu ekspor sebagai satu gambar
berukuran **Instagram Story (1080 x 1920)** yang siap dibagikan. Terinspirasi dari
[my9games.net](https://my9games.net/en), dibangun ulang untuk konsep "oshi" fandom idol.

> **Proyek fan-made, non-komersial.** Tidak berafiliasi dengan JKT48, AKB48, atau
> manajemen resmi mana pun. Semua nama & merek dagang milik pemiliknya masing-masing.

---

## Stack

| Bagian | Pilihan |
|---|---|
| Frontend | React 18 + Vite 6 (JavaScript) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` (config CSS-first `@theme`) |
| Routing | react-router-dom |
| Ikon | lucide-react |
| Export gambar | html2canvas (PNG 1080x1920) |
| Backend (opsional) | Firebase Firestore — otomatis fallback ke `localStorage` jika belum disetup |
| Hosting | Cloudflare Pages (terhubung ke GitHub) |

Design system: **Neubrutalism** — spesifikasi lengkap di [`design.md`](./design.md).

---

## Menjalankan project

```bash
npm install
npm run dev        # buka http://localhost:5173
npm run build      # hasil build masuk ke folder dist/
npm run preview    # mencoba hasil build produksi secara lokal
```

Aplikasi bisa jalan penuh **tanpa Firebase** — peringkat disimpan per-perangkat lewat
`localStorage`. Ikuti panduan di bawah kalau mau mengaktifkan peringkat global yang
terlihat oleh semua pengunjung.

---

## Setup Firebase (peringkat global)

Bagian ini opsional tapi disarankan supaya fitur "Peringkat" menampilkan data gabungan
dari semua pengguna, bukan cuma dari perangkat sendiri.

### Langkah 1 — Buat project Firebase

1. Buka [console.firebase.google.com](https://console.firebase.google.com) dan login
   dengan akun Google.
2. Klik **Add project** (Tambahkan project).
3. Isi nama project (misal `my9ngidol`), lanjutkan sampai selesai. Google Analytics
   boleh dimatikan — tidak dibutuhkan untuk project ini.

### Langkah 2 — Daftarkan aplikasi web

1. Di halaman utama project, klik ikon **`</>`** (Web) untuk menambahkan aplikasi web.
2. Isi nickname aplikasi (misal `my9ngidol-web`) lalu klik **Register app**.
3. Firebase akan menampilkan blok konfigurasi seperti ini:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "my9ngidol.firebaseapp.com",
  projectId: "my9ngidol",
  storageBucket: "my9ngidol.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef",
};
```

**Salin nilai-nilai ini** — akan dipakai di Langkah 4.

### Langkah 3 — Aktifkan Firestore Database

1. Di menu kiri console, pilih **Build → Firestore Database**.
2. Klik **Create database**.
3. Pilih **Start in production mode** (paling aman; akses akan diatur lewat rules).
4. Pilih lokasi server yang dekat dengan pengguna (misal `asia-southeast2` Jakarta),
   lalu klik **Enable**.
5. Setelah database jadi, buka tab **Rules**, hapus isinya, dan tempel aturan berikut:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memberStats/{memberId} {
      // Peringkat boleh dibaca semua orang
      allow read: if true;
      // Tulis hanya boleh menaikkan angka count (dokumen dibuat otomatis saat
      // pengguna mengirim pilihannya — tidak perlu buat manual)
      allow write: if request.resource.data.count is number
                   && request.resource.data.count >= 0;
    }
    match /meta/{docId} {
      // Penghitung global (misal jumlah formasi yang sudah dibuat)
      allow read: if true;
      allow write: if request.resource.data.count is number
                   && request.resource.data.count >= 0;
    }
  }
}
```

6. Klik **Publish**.

> Tidak perlu membuat koleksi `memberStats` secara manual. Dokumen akan terbentuk
> otomatis (`{ count: 1 }` per member id) begitu ada pengguna pertama yang menekan
> tombol "Kirim ke peringkat".

### Langkah 4 — Masukkan konfigurasi ke aplikasi (untuk development lokal)

1. Salin file contoh environment:

```bash
cp .env.example .env.local
```

(Di Windows tanpa Git Bash bisa pakai: `copy .env.example .env.local`)

2. Buka `.env.local` dan isi dengan nilai dari Langkah 2:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=my9ngidol.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my9ngidol
VITE_FIREBASE_STORAGE_BUCKET=my9ngidol.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef
```

3. Jalankan ulang `npm run dev` (Vite hanya membaca env saat proses dimulai).

> **Penting:** semua variabel env yang dibaca browser WAJIB berawalan `VITE_`.
> Tanpa awalan itu, nilainya tidak akan terbaca saat build.

### Langkah 5 — Uji bahwa Firebase sudah tersambung

1. Buka halaman **/create**, isi 9 slot, lalu tekan **Kirim ke peringkat**.
2. Buka Firestore di console Firebase → koleksi `memberStats` akan muncul berisi
   dokumen-dokumen member dengan nilai `count`.
3. Buka halaman **/rankings** — label sumber data berubah menjadi "data langsung"
   (bukan lagi "data lokal perangkat"), dan daftar terurut dari jumlah picks terbanyak.

### Keamanan: apakah API key Firebase aman ditaruh di kode?

**Ya, key Firebase memang publik dari sananya** — siapa pun bisa melihatnya di browser.
Keamanan tidak datang dari menyembunyikan key, melainkan dari **Firestore Rules**
(Langkah 3). Karena itu rules-nya harus benar; jangan pernah memakai mode terbuka
(`allow read, write: if true`) di produksi.

**Catatan vote-spam:** karena write dilakukan dari sisi client, orang iseng bisa saja
menambah vote lewat console browser. Untuk MVP ini bisa diterima. Kalau nanti traffic
besar dan butuh anti-curang serius, pindahkan penulisan peringkat ke perantara
(Cloudflare Worker atau Cloud Function).

---

## Menambah / mengubah data member

Edit `src/data/members.js`. Roster disimpan sebagai daftar tuple ringkas yang di-map
menjadi objek saat dimuat:

```js
// [id, nama, tim]
['feni-fitriyanti', 'Feni Fitriyanti', 'passion'],
```

menjadi:

```js
{ id: 'feni-fitriyanti', name: 'Feni Fitriyanti', team: 'passion', color: '#FF5252' }
```

- **Tim** didefinisikan di array `teams` sebagai `{ value, label }` — saat ini
  `love`, `dream`, `passion`, dan `trainee`. UI membaca label lewat `getTeamLabel()`,
  jadi mengganti nama tim cukup satu baris.
- **Warna** dipilih otomatis dari palet 40 warna neobrutalism secara bergiliran.
  Kalau mau warna oshi tertentu untuk seorang member, timpa field `color` di entry-nya.
- **Foto (ditunda, aman hak cipta):** secara default UI menampilkan avatar inisial di
  atas warna oshi. Untuk pakai foto asli nanti, taruh file di `public/members/<id>.jpg`
  dan set `photo: true` pada member. Untuk menyajikan dari CDN (misal Cloudflare R2),
  ubah `VITE_MEMBER_PHOTO_BASE` tanpa perlu mengubah kode.

Roster yang disertakan mencerminkan lineup aktif saat ini (Team Love / Dream / Passion +
Trainee) dan tidak tersinkron otomatis dengan pengumuman resmi — perbarui manual saat
lineup berubah. Pilihan yang tersimpan di `localStorage` difilter terhadap daftar ini saat
dimuat, jadi menghapus seorang member tidak akan merusak pilihan yang sudah ada.

---

## Deploy ke Cloudflare Pages

Kode sudah ada di GitHub: **`bayupradityaa/my9ngidol`** (branch `main`). Setiap push ke
`main` akan memicu deploy ulang secara otomatis setelah langkah di bawah selesai.

### Langkah 1 — Hubungkan repo

1. Buka [dash.cloudflare.com](https://dash.cloudflare.com) dan login.
2. Menu kiri: **Workers & Pages → Create → tab Pages → Connect to Git**.
3. Pilih GitHub (otorisasi jika diminta), lalu pilih repo **`bayupradityaa/my9ngidol`**.

### Langkah 2 — Konfigurasi build

| Pengaturan | Isi |
|---|---|
| Project name | `my9ngidol` (akan jadi bagian dari URL) |
| Production branch | `main` |
| Framework preset | **Vite** (otomatis terdeteksi) |
| Build command | `npm run build` |
| Build output directory | `dist` |

### Langkah 3 — Tambahkan environment variables

Di bagian **Environment variables** sebelum deploy, tambahkan pasangan berikut
(satu per satu), nilainya sama dengan `.env.local` di Langkah 4 setup Firebase:

| Nama variabel | Isi |
|---|---|
| `VITE_FIREBASE_API_KEY` | nilai apiKey |
| `VITE_FIREBASE_AUTH_DOMAIN` | nilai authDomain |
| `VITE_FIREBASE_PROJECT_ID` | nilai projectId |
| `VITE_FIREBASE_STORAGE_BUCKET` | nilai storageBucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | nilai messagingSenderId |
| `VITE_FIREBASE_APP_ID` | nilai appId |

(Opsional) `VITE_MEMBER_PHOTO_BASE` — isi dengan URL publik R2/CDN kalau foto member
nanti disajikan dari sana. Kalau dibiarkan kosong, foto dibaca dari folder `/members`.

### Langkah 4 — Deploy & verifikasi

1. Klik **Save and Deploy**, tunggu build selesai.
2. Buka URL yang diberikan (misal `https://my9ngidol.pages.dev`).
3. Cek: halaman bisa di-refresh di `/create` tanpa 404 (file `public/_redirects` berisi
   `/* /index.html 200` menangani routing SPA), lalu uji kirim peringkat di `/create`
   dan lihat angkanya muncul di `/rankings`.

### Update setelah deploy

Cukup commit + push ke `main` — Cloudflare akan build dan deploy ulang otomatis:

```bash
git add .
git commit -m "deskripsi perubahan"
git push
```

---

## Struktur project

```
src/
  components/   Navbar, Footer, NeoButton, NeoCard, MemberCard, FormationGrid,
                SlotPicker, StoryCard (export 1080x1920), NineGrid, PageShell, …
  context/      ThemeContext (dark/light)
  hooks/        useTopMembers
  i18n/         LanguageContext + dict.js (ID/EN)
  lib/          firebase.js (opsional, dengan fallback lokal)
  data/         members.js  ← edit roster di sini
  pages/        Landing, Create, Rankings, About, Privacy, Terms, Contact, Sources, NotFound
public/
  _redirects    fallback SPA untuk Cloudflare Pages
  favicon.svg, og-image.svg
```

---

## Konvensi responsive

- **Mobile-first:** satu kolom di bawah `640px`, dua kolom mulai `sm`, tiga sampai lima
  kolom di `md`/`lg`. Konten lebar (misal tabel peringkat) mendapat scroll horizontal di
  dalam wrapper ber-border, bukan terpotong.
- **Touch target:** semua elemen interaktif minimal sekitar 40px tingginya (tombol,
  link footer, tombol ikon, chip filter).
- **Header sticky:** navbar `sticky top-0` dengan menu hamburger di mobile.
- **Modal pemilih member** (`SlotPicker`) di-scroll di dalam (`overflow-y-auto` dengan
  `max-height`), mengunci scroll body, dan bisa ditutup lewat tombol ×, klik backdrop,
  atau tombol Escape.
- **Safe area:** padding `env(safe-area-inset-bottom)` dipakai untuk perangkat berponi.
- **Reduced motion:** animasi `.neo-float` dan smooth scroll dimatikan di bawah
  `prefers-reduced-motion`.

---

## Catatan tentang design spec

`design.md` adalah spesifikasi resmi neubrutalism. Build ini mengikutinya, dengan
beberapa deviasi yang disengaja dan didokumentasikan:

- **Border/shadow hitam murni (`#000`)** — dipertahankan sesuai brief
  (`3px solid #000` + `4px 4px 0 #000`); dipakai konsisten untuk outline dan bayangan.
- **Sudut tajam (0px)** — sesuai brief; tidak ada border radius.
- **Font:** Archivo Black (display) + Space Grotesk (body).
- **Utility custom ditulis di `src/index.css`**, bukan lewat tag `<style>` + Tailwind CDN —
  cara yang benar untuk aplikasi Vite (purge otomatis + optimasi build, tanpa runtime CDN).
- **Komponen export (`StoryCard`) memakai warna hex inline murni**, bukan class Tailwind,
  agar hasil render `html2canvas` konsisten dan bebas dari warna `oklch`.
