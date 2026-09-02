# Panduan Belajar Project Pomodoro Focus Café

Halo! Kalau Anda baru mulai belajar frontend, tenang saja. Project ini dibuat supaya mudah dipelajari satu langkah demi satu langkah. Anda tidak perlu paham semuanya sekaligus. Yang penting adalah membacanya dengan santai, lalu mencoba sedikit demi sedikit.

Tujuan dari project ini sederhana:

- membantu Anda fokus saat belajar atau bekerja
- memberi jeda singkat dan panjang secara otomatis
- menambahkan suara latar yang menenangkan
- membuat tampilan terasa lebih nyaman dan enak dipakai

Jangan merasa harus langsung menguasai semuanya. Proses belajar itu memang bertahap. Yang penting adalah terus mencoba.

---

## 1. Project ini sebenarnya seperti apa?
Project ini adalah aplikasi web statis untuk timer fokus berbasis teknik Pomodoro.

Bayangkan seperti ini:

- 25 menit fokus
- 5 menit istirahat singkat
- lalu fokus lagi
- setelah beberapa sesi, ada istirahat panjang

Aplikasi ini juga punya tombol ambient untuk suara latar seperti hujan, kafe, atau api unggun. Jadi saat belajar, suasana terasa lebih tenang dan tidak terlalu kaku.

---

## 2. Kenali struktur project dulu
Ini adalah folder utama project:

```text
frontend/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── timer.js
│   ├── audio.js
│   └── app.js
├── assets/
├── scripts/
│   └── generate_ambient.py
├── README.md
└── tips-belajar-project.md
```

### Penjelasan dengan bahasa sederhana

- `index.html` = file utama yang berisi struktur halaman
- `style.css` = file yang mengatur tampilan, warna, ukuran, layout, dan desain
- `timer.js` = file yang mengatur logika timer pomodoro
- `audio.js` = file yang menangani suara ambient dan volume
- `app.js` = file yang menghubungkan HTML dengan logika timer dan audio
- `assets/` = folder tempat file suara lokal seperti MP3
- `scripts/generate_ambient.py` = script pembantu untuk membuat efek suara saat proses pengembangan

Kalau Anda baru belajar, jangan langsung pusing dengan semua file. Cukup pahami satu per satu.

---

## 3. Mulai dari file yang paling penting: index.html
Buka file `index.html` terlebih dahulu.

Di file ini Anda akan melihat elemen-elemen seperti:

- tombol mode: Focus, Short Break, Long Break
- tampilan timer utama
- tombol Start, Pause, Reset
- daftar ambient seperti Hujan, Suara Kafe, Api Unggun
- slider volume

### Tujuan belajar dari file ini

- pahami elemen apa saja yang ada di halaman
- lihat nama class dan id yang dipakai
- kenali hubungan antara HTML dengan JavaScript

Kalau Anda tidak paham, cukup lihat saja bagian-bagian penting. Jangan langsung menghafal semuanya. Yang paling penting adalah mengenali struktur tampilan.

---

## 4. Pelajari CSS secara santai
File `style.css` adalah file yang membuat tampilan jadi enak dilihat.

Di sini Anda akan menemukan hal seperti:

- warna background
- panel kaca atau glass effect
- tombol mode
- tombol ambient
- slider volume
- layout yang responsif untuk layar kecil

### Coba lakukan ini

- ubah warna latar belakang
- ubah ukuran tombol
- ubah radius border agar lebih bulat
- coba buat tampilan lebih gelap atau lebih terang

Ini adalah cara terbaik untuk belajar CSS: coba ubah sesuatu kecil, lalu lihat hasilnya. Dengan cara itu, Anda akan cepat paham hubungan antara HTML dan CSS.

---

## 5. Pelajari timer.js dengan fokus, bukan terburu-buru
File `timer.js` adalah tempat logika utama aplikasi ini.

Biasanya di file ini ada:

- mode timer seperti focus, shortBreak, longBreak
- durasi default untuk setiap mode
- hitung mundur tiap detik
- saat timer habis, aplikasi berpindah ke mode berikutnya
- penghitungan sesi fokus

### Alur kerja aplikasi ini

1. pengguna menekan tombol Start
2. timer mulai berjalan mundur
3. tiap detik waktu berkurang
4. saat mencapai 00:00, mode berubah atau sesi berlanjut
5. sesi fokus bertambah

Cobalah jawab pertanyaan ini:

- apa yang terjadi saat fungsi `startTimer()` dipanggil?
- bagaimana `setMode()` mengubah mode aktif?
- kapan event `pomodoro:phase-complete` dipicu?

Jika Anda masih bingung, jangan khawatir. Cukup baca perlahan, lalu cari bagian yang paling relevan.

---

## 6. Pahami audio.js dengan cara sederhana
File `audio.js` berfungsi untuk mengatur suara latar.

Beberapa bagian penting di file ini:

- `SOUND_LIBRARY` berisi daftar suara yang tersedia
- `playSound()` memutar suara yang dipilih
- `pauseSound()` menghentikan suara
- `setVolume()` mengatur volume
- `toggleSound()` menghidupkan atau mematikan suara

### Catatan penting

- sumber suara dari YouTube atau embed sering punya keterbatasan di browser
- beberapa kontrol volume tidak bekerja sepenuhnya pada jenis file tertentu
- file lokal seperti MP3 biasanya lebih stabil untuk kontrol suara

Jadi, untuk project ini, file audio lokal itu paling aman dan paling mudah dikendalikan.

---

## 7. Pelajari app.js sebagai penghubung
File `app.js` adalah jembatan antara tampilan dan logika.

Fungsi utamanya:

- mengambil elemen DOM dari HTML
- menambahkan event listener pada tombol Start, Pause, Reset
- menghubungkan tombol ambient dengan audio
- menghubungkan slider volume dengan kontrol suara
- memperbarui tampilan timer dan indikator sesi

Contoh pola yang sering muncul:

```js
button.addEventListener('click', () => {
  timerApi.startTimer();
  renderTimerUI();
});
```

Artinya:

- pengguna klik tombol
- program memanggil fungsi timer
- lalu tampilan diperbarui

Ini adalah pola yang sangat umum di frontend. Kalau Anda paham pola ini, Anda sudah mulai masuk ke logika JavaScript yang sebenarnya.

---

## 8. Belajar dengan urutan yang benar
Jangan belajar semuanya sekaligus. Lebih baik belajar bertahap seperti ini:

### Tahap 1: HTML
- pahami struktur utama halaman
- kenali elemen apa saja yang ada
- lihat id dan class yang digunakan

### Tahap 2: CSS
- ubah warna, margin, ukuran, dan tata letak
- pahami bagaimana desain dibuat

### Tahap 3: timer.js
- pelajari cara waktu berjalan mundur
- pahami cara ganti mode dan menghitung sesi

### Tahap 4: app.js
- pahami cara DOM dihubungkan ke logika

### Tahap 5: audio.js
- pelajari cara suara diatur dan diputar
- coba tambah tombol ambient baru

Ini urutan yang paling nyaman untuk pemula.

---

## 9. Latihan kecil yang bagus untuk pemula
Coba lakukan latihan berikut satu per satu:

- ubah durasi Focus dari 25 menit menjadi 15 menit
- ubah Short Break dari 5 menit menjadi 10 menit
- ubah warna tombol fokus menjadi warna lain
- tambahkan tombol ambient baru dengan label baru
- ubah ukuran font timer agar lebih besar atau lebih kecil

### Contoh mini challenge

1. tambah tombol `Forest`
2. tambahkan icon 🌲
3. masukkan nama suara ke `SOUND_LIBRARY`
4. pastikan tombol muncul otomatis di UI

Latihan kecil seperti ini akan membuat Anda lebih cepat paham daripada hanya membaca teori.

---

## 10. Kenapa project ini bagus untuk belajar?
Project ini sangat cocok untuk belajar frontend karena mencakup banyak hal sekaligus:

- HTML untuk struktur halaman
- CSS untuk tampilan dan desain
- JavaScript untuk logika
- DOM manipulation untuk mengubah elemen di halaman
- event handling untuk interaksi tombol
- kontrol audio untuk suara latar
- UX yang sederhana tapi fungsional

Jadi, Anda belajar bukan hanya satu hal, tapi kombinasi beberapa konsep penting dalam satu project yang terasa nyata.

---

## 11. Tips agar belajar terasa lebih ringan
Berikut saran yang paling efektif untuk orang yang baru mulai:

- baca satu file dalam satu waktu
- jangan langsung membaca semua file sekaligus
- ubah satu variabel kecil lalu lihat hasilnya
- jangan takut mencoba
- cek hasil di browser setiap kali ada perubahan
- tulis fungsi yang Anda pahami satu per satu

Semakin sering Anda mencoba, semakin paham Anda akan alur aplikasi.

---

## 12. Langkah sederhana berikutnya
Coba bikin perubahan kecil ini:

- ubah label `Hujan` menjadi `Rainy Mood`
- ubah warna tombol Start
- tambahkan ambient baru
- ubah angka default timer

Coba satu saja dulu. Jangan langsung banyak perubahan. Kunci belajar yang paling efektif adalah coba, lihat hasil, lalu pahami.

---

## 13. Website belajar web yang bagus
Selain project ini, ada beberapa sumber belajar yang sangat berguna untuk melengkapi perjalanan Anda belajar frontend dan web development. Berikut beberapa rekomendasi yang bagus untuk pemula:

- [CodePolitan](https://codepolitan.com) — situs belajar pemrograman yang membahas HTML, CSS, JavaScript, dan berbagai tutorial web dengan bahasa yang ringan dan mudah dipahami.
- [Devhandal](https://devhandal.com) — platform belajar teknologi dan pemrograman yang sering membahas web development secara praktis.
- [W3Schools](https://www.w3schools.com) — referensi populer untuk HTML, CSS, JavaScript, dan dasar-dasar teknologi web.
- [MDN Web Docs](https://developer.mozilla.org) — dokumentasi resmi dan sangat lengkap untuk memahami browser, HTML, CSS, dan JavaScript.
- [freeCodeCamp](https://www.freecodecamp.org) — website belajar coding dengan latihan dan proyek kecil yang membantu melatih kemampuan secara bertahap.
- [Petani Kode](https://www.petanikode.com) — situs belajar coding yang cocok untuk pemula dengan penjelasan sederhana.
- [JavaScript.info](https://javascript.info) — sumber yang bagus untuk mempelajari JavaScript secara lebih terstruktur dan mendalam.
- [CSS Tricks](https://css-tricks.com) — fokus pada teknik CSS dan desain tampilan web.

### Cara memanfaatkannya

- pilih satu sumber yang paling nyaman dibaca
- baca materi yang sesuai dengan proyek yang sedang dikerjakan
- coba langsung praktikkan di browser
- ulangi sampai benar-benar paham

Belajar web itu lebih cepat masuk kalau Anda tidak hanya membaca, tapi juga mencoba langsung mengubah kode dan melihat hasilnya.

---

## 14. Kesimpulan
Project ini memang terlihat sederhana, tapi isinya cukup lengkap untuk belajar frontend secara nyata.

Anda tidak harus langsung jadi ahli. Yang penting adalah:

- mulai dari yang paling mudah
- pahami file satu per satu
- coba ubah hal kecil
- lihat hasilnya
- ulangi sampai terasa masuk

Kalau Anda terus belajar dengan cara seperti ini, project ini akan terasa lebih mudah dan lebih menyenangkan.

Anda tidak sedang belajar sesuatu yang rumit. Anda sedang membangun sesuatu yang bisa dipakai, dan itu sama sekali bukan hal yang mustahil.

Semangat belajar! 😊
