# Pomodoro Focus Café

Aplikasi web statis sederhana untuk menjaga fokus dengan teknik Pomodoro, dilengkapi suara latar ambient yang membantu menenangkan suasana belajar atau bekerja.

## Fitur utama

- Mode timer: Focus, Short Break, Long Break
- Tombol Start, Pause, dan Reset
- Indikator sesi fokus yang sudah selesai
- Suara ambient: Hujan, Suara Kafe, Api Unggun
- Slider volume untuk mengatur intensitas suara
- Desain glassmorphism minimalis dengan Tailwind CSS

## Struktur folder

```text
frontend/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── timer.js
│   ├── audio.js
│   └── app.js
├── README.md
└── assets/
```

## Cara menjalankan

1. Buka folder `frontend`.
2. Jalankan file `index.html` langsung di browser.
3. Aplikasi akan berjalan tanpa perlu install package atau konfigurasi Node.js.

## Catatan teknis

- Menggunakan Tailwind CSS via CDN.
- JavaScript ditulis dalam ES6+.
- Tidak memerlukan build tool atau server local.

## Komentar belajar

- `timer.js` berfungsi sebagai logika inti pomodoro.
- `audio.js` menangani pemutaran dan kontrol volume suara latar.
- `app.js` adalah penghubung antara DOM dan logic aplikasi.
