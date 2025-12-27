# 🗄️ Dokumentasi Database MomenKita

Dokumentasi ini menjelaskan struktur 10 tabel dalam database Supabase, dikelompokkan berdasarkan modul fungsinya.

---

## 💰 MODUL A: SAAS ENGINE (Bisnis & User)

### 1. `public.subscription_plans`
Master data paket langganan yang tersedia (Free, Premium, Business).
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | SERIAL (PK) | ID Paket. |
| `name` | Text | Nama paket (contoh: 'Basic', 'Premium'). |
| `price` | Numeric | Harga paket. |
| `duration_days` | Integer | Masa aktif dalam hari. |
| `features` | JSONB | Config fitur (misal: max tamu, fitur premium). |
| `is_active` | Boolean | Status paket tersedia/tidak. |

### 2. `public.profiles`
Data user admin/pembuat undangan. Terhubung langsung dengan Auth Supabase.
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Sama dengan `auth.users.id`. |
| `full_name` | Text | Nama lengkap. |
| `phone` | Text | Nomor HP. |
| `email` | Text | Email login. |
| `current_plan_id` | Integer (FK) | Paket yang sedang aktif. |
| `quota_limit` | Integer | Sisa kuota pembuatan undangan. |

### 3. `public.user_subscriptions`
Riwayat pembayaran dan status langganan user.
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | ID Transaksi. |
| `user_id` | UUID (FK) | User yang bayar. |
| `plan_id` | Integer (FK) | Paket yang dibeli. |
| `status` | Text | 'pending_payment', 'active', 'expired'. |
| `payment_ref` | Text | ID Referensi dari Payment Gateway (Midtrans/Xendit). |
| `starts_at` | Timestamptz | Tanggal mulai aktif. |
| `ends_at` | Timestamptz | Tanggal berakhir. |

---

## 💍 MODUL B: CORE PRODUCT (Undangan)

### 4. `public.invitations`
Tabel utama konfigurasi undangan. Menggunakan JSONB untuk fleksibilitas data.
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | ID Undangan. |
| `user_id` | UUID (FK) | Pemilik undangan. |
| `slug` | Text (Unique) | URL undangan (contoh: `romeo-juliet`). |
| `groom_info` | JSONB | Data Pria (Nama, Ortu, Sosmed). |
| `bride_info` | JSONB | Data Wanita (Nama, Ortu, Sosmed). |
| `theme_config` | JSONB | Pilihan warna, font, dan kode tema. |
| `feature_flags` | JSONB | Toggle fitur aktif/nonaktif. |
| `seo_meta` | JSONB | Judul & deskripsi untuk preview link WA. |
| `music_url` | Text | URL musik latar. |
| `cover_image` | Text | Foto sampul depan. |

### 5. `public.invitation_sessions`
Jadwal rangkaian acara (Akad, Resepsi, Ngunduh Mantu, dll).
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | ID Sesi. |
| `invitation_id` | UUID (FK) | Undangan induk. |
| `session_name` | Text | Nama acara. |
| `start_datetime` | Timestamptz | Waktu mulai. |
| `end_datetime` | Timestamptz | Waktu selesai. |
| `venue_name` | Text | Nama lokasi/gedung. |
| `map_link` | Text | Link Google Maps. |

---

## 🤝 MODUL C: TAMU & KEHADIRAN (Smart CRM)

### 6. `public.guests`
Master data tamu undangan.
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | ID Tamu. |
| `invitation_id` | UUID (FK) | Undangan induk. |
| `name` | Text | Nama tamu. |
| `slug` | Text | Kode unik tamu (untuk QR Code). |
| `category` | Text | Kategori (VIP, Keluarga, Teman). |
| `phone_number` | Text | Nomor WA. |
| `quota_pax` | Integer | Jatah jumlah orang. |

### 7. `public.guest_attendance`
Pencatatan RSVP dan Check-in tamu per sesi acara.
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | ID Kehadiran. |
| `guest_id` | UUID (FK) | Tamu terkait. |
| `session_id` | UUID (FK) | Sesi acara terkait. |
| `rsvp_status` | Text | 'pending', 'attending', 'not_attending'. |
| `total_guests_confirmed` | Integer | Jumlah pax konfirmasi hadir. |
| `check_in_time` | Timestamptz | Waktu scan QR Code (Buku Tamu Digital). |
| `gift_intent` | Text | Rencana kado ('physical', 'digital', 'none'). |
| `physical_gift_code` | Text | Kode unik label kado fisik. |

---

## 📸 MODUL D: FITUR TAMBAHAN (Add-ons)

### 8. `public.digital_accounts`
Rekening atau E-Wallet untuk fitur Amplop Digital.
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | ID Akun. |
| `invitation_id` | UUID (FK) | Undangan induk. |
| `bank_name` | Text | Nama Bank (BCA, Mandiri, Gopay). |
| `account_number` | Text | Nomor Rekening. |
| `account_holder` | Text | Atas Nama. |

### 9. `public.wishes`
Buku tamu ucapan & doa.
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | ID Ucapan. |
| `invitation_id` | UUID (FK) | Undangan induk. |
| `sender_name` | Text | Nama pengirim. |
| `message` | Text | Isi ucapan. |
| `reply` | Text | Balasan pengantin. |
| `is_visible` | Boolean | Status tampil/sembunyi. |

### 10. `public.gallery`
Galeri foto dan video prewedding.
| Kolom | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID (PK) | ID Media. |
| `invitation_id` | UUID (FK) | Undangan induk. |
| `media_url` | Text | URL file media. |
| `type` | Text | 'photo' atau 'video'. |
| `caption` | Text | Caption foto. |

---

## 🛡️ Catatan Keamanan & Trigger

1.  **Row Level Security (RLS):** Semua tabel sensitif (`profiles`, `invitations`, `guests`) wajib mengaktifkan RLS agar user hanya bisa melihat data miliknya sendiri.
2.  **Trigger `handle_new_user`:** Setiap kali user mendaftar lewat Auth, data `profiles` akan otomatis dibuat.