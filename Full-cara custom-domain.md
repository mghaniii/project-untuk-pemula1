# 🚀 Panduan Lengkap: Menghubungkan Domain Name.com ke Tencent EdgeOne Makers

Selamat datang! Di tutorial ini, kita akan belajar cara melakukan *deployment* web secara otomatis (CI/CD) dari GitHub dan menghubungkannya dengan domain kustom dari **Name.com** menggunakan infrastruktur kelas dunia: **Tencent EdgeOne Makers**.

Tidak hanya online, web kamu juga akan dilengkapi dengan **HTTPS (Gembok Hijau) otomatis**, kecepatan **HTTP/2**, dan perlindungan **Anti-Bot (CAPTCHA)** sekelas *enterprise*!

---

## 📋 Persiapan (Prerequisites)
Sebelum mulai, pastikan kamu sudah memiliki:
1. Akun **GitHub** yang berisi *source code* web statis/portofolio kamu.
2. Akun **Tencent Cloud** (EdgeOne).
3. Domain aktif di **Name.com** (misalnya: `namakamu.live`).

---

## 🛠️ Langkah 1: Deploy Web di EdgeOne Pages

1. Login ke konsol [Tencent EdgeOne](https://edgeone.ai/).
2. Masuk ke menu **Pages** di *sidebar* kiri, lalu klik **New Project**.
3. Hubungkan akun GitHub kamu dengan mengklik **Authorize**.
4. Pilih *repository* yang ingin di-deploy.
5. EdgeOne akan otomatis mendeteksi *framework* yang kamu gunakan. Klik **Deploy**.
6. Tunggu beberapa detik. *Boom!* Web kamu sudah online menggunakan URL bawaan EdgeOne (contoh: `namaproject.edgeone.app`).

> **💡 Pro Tip:** Berkat fitur CI/CD bawaan, ke depannya kamu cukup melakukan `git push` di VS Code, dan web kamu akan ter-*update* secara otomatis tanpa perlu *upload* file manual lagi!

---

## 🔗 Langkah 2: Verifikasi Kepemilikan Domain di Name.com

URL bawaan EdgeOne terlihat kurang profesional, jadi kita akan menggantinya dengan domain milik kita sendiri.

1. Di *dashboard* project EdgeOne Pages kamu, masuk ke menu **Custom Domains**.
2. Klik tombol **Add Domain** dan masukkan nama domain kamu (contoh: `namakamu.live`).
3. EdgeOne akan menampilkan halaman **Ownership Verification** (Verifikasi Kepemilikan) berupa `TXT Record`.
4. Buka tab baru, *login* ke **Name.com**, dan masuk ke menu **Manage DNS Records** pada domain kamu.
5. Tambahkan *record* baru dengan format berikut:
   - **Type:** `TXT`
   - **Host:** `edgeonereclaim`
   - **Answer:** *(Paste nilai token panjang dari EdgeOne di sini, contoh: `reclaim-ja7sqx...`)*
6. Klik **Add Record**.

> **⚠️ Catatan Keamanan:** Token TXT *Value/Answer* bersifat **RAHASIA**. Jika kamu membuat video tutorial, pastikan untuk men-sensor (blur) sebagian dari token ini untuk mencegah penyalahgunaan oleh pihak yang tidak bertanggung jawab.

7. Kembali ke tab EdgeOne, tunggu sekitar **5-10 menit** (masa propagasi DNS), lalu klik tombol putih **Verify**. Jika sukses, klik **Complete**.

---

## 🌍 Langkah 3: Arahkan Domain (CNAME Record)

Setelah diverifikasi, saatnya menyambungkan rute internet dari Name.com ke server EdgeOne.

1. Di EdgeOne, setelah verifikasi selesai, kamu akan mendapatkan sebuah alamat target (biasanya berakhiran `.edgeone.app`). *Copy* alamat tersebut.
2. Kembali ke menu **DNS Records** di **Name.com**.
3. Tambahkan *record* baru dengan format:
   - **Type:** `CNAME`
   - **Host:** Biarkan kosong, atau ketik `@` (Untuk domain utama. Ketik `www` jika ingin menggunakan www).
   - **Answer:** *(Paste alamat target dari EdgeOne tadi)*
4. Klik **Add Record**.
5. Tunggu beberapa menit hingga status domain di EdgeOne berubah menjadi **Active** (Warna Hijau).

---

## 🔒 Langkah 4: Aktifkan HTTPS & HTTP/2 (Gembok Hijau)

Domain sudah aktif, tapi mungkin saat dibuka masih bertuliskan *Not Secure*. Mari kita amankan!

1. Di EdgeOne, pada baris domain kamu, klik menu **HTTPS Configuration**.
2. Di bagian *Edge HTTPS certificate*, klik tombol **Configuration**.
3. Pilih opsi **Apply for a free certificate** untuk mendapatkan SSL gratis dari Tencent.
4. **SANGAT PENTING:** Nyalakan *toggle* **Force HTTPS**. Ini memastikan semua pengunjung secara otomatis diarahkan ke versi web yang aman (dari `http://` ke `https://`).
5. Aktifkan juga *toggle* **HTTP/2** agar *loading* aset web kamu menjadi jauh lebih cepat dan paralel.

*(Coba buka web kamu menggunakan tab mode **Incognito**, gembok hijau sekarang sudah menyala dengan gagah!)*

---

## 🤖 Langkah 5 (Bonus): Aktifkan Satpam Anti-Bot (CAPTCHA)

Jangan biarkan web kerenmu tumbang karena serangan *spam* atau *bot*. EdgeOne menyediakan perlindungan Web Application Firewall (WAF) kelas atas secara gratis.

1. Masuk ke menu **Security** di EdgeOne Pages.
2. *Scroll* ke bagian **Bot Management**.
3. Aktifkan *toggle* pada **CAPTCHA Page** menjadi **ON**.
4. Selesai!

Sekarang, setiap pengunjung mencurigakan atau robot *spam* yang mencoba mengakses web kamu akan dicegat oleh halaman verifikasi "I am human". Keamanan web statismu kini setara dengan standar *enterprise*!

---

**🎉 Selamat!** 
Kamu telah berhasil men-deploy, menyambungkan domain, dan mengamankan web kamu menggunakan arsitektur modern. Selamat berkarya dan salam *coding*!

*Dokumentasi ini dibuat sebagai panduan pendukung untuk misi Codepolitan & Tencent EdgeOne Makers.*
