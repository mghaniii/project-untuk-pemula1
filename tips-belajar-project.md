# Tips Belajar Project Pomodoro Focus Café

Dokumen ini dibuat untuk membantu Anda belajar project ini langkah demi langkah, terutama jika Anda masih pemula di frontend.

## 1. Pahami tujuan project
Project ini adalah aplikasi web statis untuk timer fokus berbasis Pomodoro. Tujuan utamanya adalah:

- membantu pengguna fokus saat belajar atau bekerja
- memberi jeda singkat dan panjang secara otomatis
- menambahkan suara latar yang menenangkan
- membuat tampilan lebih estetik dan nyaman dipakai

## 2. Kenali struktur project
Folder utama project:

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

### Penjelasan singkat

- `index.html` = struktur utama halaman
- `style.css` = tampilan desain, warna, layout, panel kaca
- `timer.js` = logika timer pomodoro
- `audio.js` = logika suara ambient dan pengaturan volume
- `app.js` = menghubungkan DOM ke logic timer/audio
- `assets/` = file audio lokal seperti `campfire.mp3`
- `scripts/generate_ambient.py` = script bantu untuk membuat efek suara saat pengembangan

## 3. Mulai dari file paling penting: `index.html`
Buka file `index.html` terlebih dahulu. Perhatikan hal berikut:

- ada elemen tombol mode: Focus, Short Break, Long Break
- ada tampilan timer utama
- ada tombol Start, Pause, Reset
- ada daftar tombol ambient seperti Hujan, Suara Kafe, Api Unggun
- ada slider volume

Tujuan belajar:

- pahami elemen HTML apa saja yang dibuat
- lihat id dan class yang dipakai agar JS bisa mengaksesnya

## 4. Pelajari CSS secara bertahap
File `css/style.css` berisi desain visual.

Hal yang perlu dilihat:

- warna background
- panel kaca (`glass-panel`)
- tombol mode (`mode-btn`)
- tombol ambient (`ambient-btn`)
- slider volume (`volume-slider`)
- responsive design untuk layar kecil

Tips:

- coba ubah warna atau border radius
- coba ganti ukuran tombol
- coba ubah background menjadi lebih gelap atau lebih terang

Ini akan membantu Anda memahami hubungan HTML + CSS.

## 5. Pelajari timer.js dengan fokus
File `timer.js` adalah tempat logika kerja pomodoro.

Yang biasanya ada di file ini:

- mode timer seperti focus, shortBreak, longBreak
- waktu default tiap mode
- perhitungan mundur tiap detik
- saat timer habis, trigger event untuk ganti mode atau sesi
- penghitungan jumlah sesi fokus

Pelajari alur kerja:

1. user menekan Start
2. timer berjalan mundur
3. setiap detik dikurangi
4. saat 00:00, mode lanjut ke berikutnya
5. sesi fokus bertambah

Coba jawab pertanyaan ini:

- apa yang terjadi saat `startTimer()` dipanggil?
- bagaimana `setMode()` mengubah mode aktif?
- kapan event `pomodoro:phase-complete` dipicu?

## 6. Pahami audio.js
File `audio.js` adalah bagian yang mengelola suara latar.

Ada beberapa hal penting di sini:

- `SOUND_LIBRARY` berisi daftar suara
- `playSound()` memutar suara yang dipilih
- `pauseSound()` mematikan suara
- `setVolume()` mengatur volume
- `toggleSound()` berfungsi untuk menyalakan atau mematikan suara

Catatan penting:

- sumber YouTube/embed memiliki keterbatasan browser
- beberapa fungsi volume tidak bekerja full seperti file audio lokal
- file lokal seperti MP3 lebih stabil untuk kontrol volume

## 7. Pelajari app.js
File `app.js` menghubungkan semua bagian.

Tugas utamanya:

- ambil elemen DOM dari HTML
- event listener untuk tombol Start, Pause, Reset
- event listener untuk tombol ambient
- event listener untuk slider volume
- update tampilan timer dan indikator sesi

Coba pahami pola ini:

```js
button.addEventListener('click', () => {
  timerApi.startTimer();
  renderTimerUI();
});
```

Ini artinya:

- klik tombol
- panggil fungsi timer
- lalu update tampilan UI

## 8. Belajar dengan cara bertahap
Berikut urutan belajar yang disarankan:

### Tahap 1: HTML
- pahami struktur elemen utama
- kenali id dan class yang dipakai

### Tahap 2: CSS
- ubah warna, ukuran, jarak antar elemen
- pahami apa yang membuat tampilan terlihat estetik

### Tahap 3: timer.js
- pelajari logika mundur waktu
- pahami cara ganti mode dan menghitung sesi

### Tahap 4: app.js
- pahami bagaimana DOM dihubungkan ke logika

### Tahap 5: audio.js
- pahami cara mengatur suara dan volume
- coba tambahkan tombol ambient baru

## 9. Tips latihan mandiri
Coba lakukan latihan kecil berikut:

- ubah durasi Focus dari 25 menit menjadi 15 menit
- ubah Short Break dari 5 menit menjadi 10 menit
- ubah warna tombol fokus ke warna lain
- tambahkan tombol ambient baru dengan label baru
- ubah jenis font atau ukuran timer

### Contoh mini challenge

1. tambah tombol `Forest`
2. tambahkan icon 🌲
3. masukkan ke `SOUND_LIBRARY`
4. pastikan tombol muncul otomatis di UI

## 10. Kesimpulan
Project ini sangat bagus untuk belajar frontend karena menggabungkan:

- HTML struktur
- CSS styling
- JavaScript logic
- DOM manipulation
- event handling
- audio control
- ui/ux yang sederhana tetapi fungsional

Anda tidak perlu menguasai semuanya sekaligus. Fokus dulu pada satu file, lalu lanjut ke file berikutnya.

## 11. Saran belajar paling efektif

- buka satu file per satu waktu
- baca lalu coba ubah variabel kecil
- jangan langsung edit banyak hal sekaligus
- cek hasil di browser setiap kali ada perubahan
- catat fungsi yang Anda pahami satu per satu

Dengan cara ini, Anda akan lebih cepat paham alur aplikasi.

## 12. Langkah selanjutnya
Coba buat perubahan kecil berikut:

- ubah label `Hujan` menjadi `Rainy Mood`
- ubah warna tombol Start
- tambah ambient baru
- ganti angka default timer

Semakin sering Anda mencoba, semakin paham Anda akan project ini.
