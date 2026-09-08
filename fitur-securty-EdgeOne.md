# 🛡️ Panduan Keamanan: Membedah Fitur WAF di Tencent EdgeOne Pages

Punya web portofolio yang cepat saja tidak cukup, web kamu juga harus **AMAN**. Banyak *developer* pemula mengira web statis (HTML/CSS) tidak bisa di-hack. Padahal, *hacker* bisa mengirim *bot spam* atau melakukan serangan *DDoS* yang membuat web kamu *down* (mati) dan menguras *bandwidth*!

Untungnya, **Tencent EdgeOne** menyediakan fitur **Web Application Firewall (WAF)** kelas *enterprise* secara gratis. EdgeOne bertindak sebagai "Satpam Elit" yang menjaga gerbang depan web kamu.

Mari kita bedah 4 lapisan keamanan (*Multi-layered Security*) yang ada di halaman **Security** EdgeOne:

---

## 1. 🛑 Custom Rule (Aturan Kustom)
*Analogi: Satpam pemegang buku "Daftar Tamu & Daftar Hitam (Blacklist)" di pintu gerbang luar.*

Fitur ini memungkinkan kamu membuat aturan keamanan manual sesuai kebutuhan spesifik webmu. 
- **Fungsi Utama:** Memblokir atau mengizinkan pengunjung berdasarkan kondisi tertentu (seperti IP Address, Negara, atau *User-Agent*).
- **Contoh Kasus:** Jika kamu tahu ada IP tertentu yang sering mencoba meretas webmu, kamu bisa memasukkan IP tersebut ke daftar *block*. Atau, kamu bisa mengatur agar web portofoliomu hanya bisa diakses oleh pengunjung dari negara Indonesia saja (*Region Restriction*).

## 2. 🚦 Rate Limiting (Anti-Spam & Pembatasan Kecepatan)
*Analogi: Pintu Putar (Turnstile) di stasiun yang membatasi orang masuk harus satu per satu agar tidak jebol.*

Hacker sering melakukan serangan *Brute Force* (mengirim data bertubi-tubi dalam hitungan detik) untuk membuat server kewalahan.
- **Adaptive Frequency Control:** EdgeOne menggunakan AI untuk mendeteksi *traffic* aneh. Misalnya, jika ada 1 IP mencoba me-*refresh* web kamu 2.000 kali dalam 5 detik, EdgeOne tidak langsung memblokirnya, tapi akan memberinya **JavaScript Challenge**. 
- **Apa itu JS Challenge?** Ini adalah tes matematika tak kasatmata di latar belakang. *Browser* manusia (seperti Chrome) akan otomatis menyelesaikannya tanpa kita sadari, tapi robot jahat (bot) akan gagal dan ditendang keluar!

## 3. 🤖 Bot Management (Manajemen Robot & AI)
*Analogi: Resepsionis yang meminta KTP asli pengunjung untuk membedakan manusia dan robot.*

Saat ini, hampir separuh *traffic* di internet adalah Robot (Bot). Fitur ini sangat krusial untuk melindungi aset dan *bandwidth* web kamu.
- **CAPTCHA Page:** Jika diaktifkan, pengunjung (terutama yang mencurigakan) akan dicegat oleh halaman verifikasi CAPTCHA dari Tencent. Mereka wajib membuktikan diri sebagai manusia (mencentang "I am human") sebelum pintu web statis kamu dibukakan. Sangat efektif menahan *spam bot*!
- **AI Crawler Control:** Punya artikel atau data berharga di web portofoliomu? Nyalakan fitur ini untuk memblokir *bot crawler* (seperti bot milik platform AI besar) agar mereka tidak mencuri/men- *scrape* data webmu tanpa izin.

## 4. 🌊 DDoS Protection (Anti Banjir Data)
*Analogi: Sistem drainase raksasa yang menampung banjir bandang agar tidak menenggelamkan kota.*

DDoS (*Distributed Denial of Service*) adalah serangan di mana peretas menyuruh jutaan komputer "zombi" dari seluruh dunia untuk mengakses webmu secara bersamaan di detik yang sama, membuat server meledak.
- **Fungsi Utama:** Di EdgeOne, perlindungan DDoS tingkat dasar ini **sudah aktif secara otomatis (Default)**! 
- EdgeOne memiliki kapasitas *bandwidth* global yang raksasa. Jika ada serangan banjir data, jaringan EdgeOne akan menyerap dan menyaring (*automated traffic scrubbing*) lalu lintas kotor tersebut di tengah jalan, sehingga server aslimu tetap aman dan web tetap bisa diakses.

---

### 💡 Kesimpulan
Dengan mengaktifkan fitur-fitur di atas (terutama **CAPTCHA Page** dan **Force HTTPS**), web portofolio kamu tidak hanya sekadar "tampil", tapi juga memiliki daya tahan setara dengan web perusahaan besar. 

Tidur nyenyak, biarkan **Tencent EdgeOne** yang berjaga sepanjang malam! 🌙🛡️
