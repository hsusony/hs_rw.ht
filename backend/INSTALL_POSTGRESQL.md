# 🐘 دليل تثبيت PostgreSQL - نظام ويندوز

## 📥 الخطوة 1: تحميل PostgreSQL

### الطريقة الأولى: التحميل المباشر (موصى بها)

1. **افتح المتصفح واذهب إلى:**
   ```
   https://www.postgresql.org/download/windows/
   ```

2. **اضغط على "Download the installer"**

3. **اختر الإصدار المناسب:**
   - PostgreSQL 16.x أو 15.x (أحدث إصدار مستقر)
   - Windows x86-64 (لنظام 64 بت)

4. **حجم الملف:** حوالي 400 MB

### الطريقة الثانية: رابط مباشر
```
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
```

---

## 🔧 الخطوة 2: تثبيت PostgreSQL

### أثناء التثبيت:

1. **Setup PostgreSQL**
   - اضغط Next

2. **Select Installation Directory**
   - اترك المسار الافتراضي: `C:\Program Files\PostgreSQL\16`
   - Next

3. **Select Components**
   - ✅ PostgreSQL Server (مطلوب)
   - ✅ pgAdmin 4 (أداة إدارة مرئية - موصى بها)
   - ✅ Stack Builder (اختياري)
   - ✅ Command Line Tools (مطلوب)
   - Next

4. **Data Directory**
   - اترك الافتراضي: `C:\Program Files\PostgreSQL\16\data`
   - Next

5. **Password** ⚠️ **مهم جداً**
   ```
   أدخل كلمة مرور لمستخدم postgres
   مثال: postgres123
   
   ⚠️ احفظ هذه الكلمة! ستحتاجها لاحقاً
   ```
   - أدخل الكلمة مرتين
   - Next

6. **Port**
   - اترك الافتراضي: `5432`
   - Next

7. **Advanced Options - Locale**
   - اختر: `Arabic, Iraq` أو `English, United States`
   - Next

8. **Pre Installation Summary**
   - راجع الإعدادات
   - Next

9. **انتظر اكتمال التثبيت** (5-10 دقائق)

10. **Completing the PostgreSQL Setup**
    - ❌ قم بإلغاء تحديد "Launch Stack Builder at exit"
    - Finish

---

## ✅ الخطوة 3: التحقق من التثبيت

### 1. افتح PowerShell كمسؤول:
```powershell
# أضف PostgreSQL إلى PATH مؤقتاً
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"

# اختبر الاتصال
psql --version
```

### 2. النتيجة المتوقعة:
```
psql (PostgreSQL) 16.x
```

---

## 🗄️ الخطوة 4: إنشاء قاعدة البيانات

### الطريقة الأولى: من PowerShell

```powershell
# سجل دخول إلى PostgreSQL
# سيطلب كلمة المرور التي أدخلتها أثناء التثبيت
psql -U postgres

# بعد تسجيل الدخول، نفذ:
CREATE DATABASE hotel_management;

# تحقق من إنشاء القاعدة
\l

# اخرج
\q
```

### الطريقة الثانية: باستخدام pgAdmin 4

1. **افتح pgAdmin 4** من قائمة Start

2. **أدخل Master Password** (اختياري - يمكن تركه فارغاً في المرة الأولى)

3. **من الشريط الجانبي:**
   ```
   Servers → PostgreSQL 16 (اضغط عليه)
   ```

4. **أدخل كلمة المرور** التي أدخلتها أثناء التثبيت

5. **انقر بزر الماوس الأيمن على "Databases"**
   - Create → Database...

6. **في نافذة Create Database:**
   ```
   Database: hotel_management
   Owner: postgres
   ```
   - Save

7. **تم!** ستظهر قاعدة البيانات الجديدة في القائمة

---

## 🔑 الخطوة 5: تحديث ملف .env

في مجلد `backend`، افتح ملف `.env` وحدث:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_management
DB_USER=postgres
DB_PASSWORD=كلمة_المرور_التي_أدخلتها_أثناء_التثبيت
```

**مثال:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_management
DB_USER=postgres
DB_PASSWORD=postgres123
```

---

## 🚀 الخطوة 6: تشغيل السكريبتات

بعد التثبيت وإنشاء قاعدة البيانات:

```powershell
cd C:\Users\HS_RW\Desktop\hotel\backend

# إنشاء الجداول (30 جدول)
npm run init-db

# إدراج البيانات التجريبية
npm run seed
```

### النتيجة المتوقعة:

```
✅ Database tables created successfully
✅ Database initialization completed

🌱 Starting database seeding...
✅ Super Admin created
✅ Accountant created
✅ Hotel Manager created
✅ Receptionist created
✅ Sample Customer created
✅ Sample Hotel created
✅ Sample Rooms created (20 rooms)
✅ Floors created (5 floors)
✅ Room Types created
✅ Halls created
✅ Additional Services created
✅ Expense Accounts created
✅ Warehouse created
✅ Inventory Items created
✅ Booking Apps created
✅ Partner created
✅ Payment Methods created
✅ Sample Subscription created
✅ Trial Period created
✅ Sample Agent created

🎉 Database seeding completed successfully!
```

---

## 📊 الخطوة 7: عرض البيانات (اختياري)

### باستخدام pgAdmin 4:

1. افتح pgAdmin 4
2. انتقل إلى: `Servers → PostgreSQL 16 → Databases → hotel_management`
3. انقر بزر الماوس الأيمن على `hotel_management`
4. اختر: `Query Tool`
5. جرب استعلامات مثل:

```sql
-- عرض جميع المستخدمين
SELECT * FROM users;

-- عرض الفنادق
SELECT * FROM hotels;

-- عرض الغرف
SELECT * FROM rooms;

-- عرض الحجوزات
SELECT * FROM bookings;

-- إحصائيات
SELECT 
  (SELECT COUNT(*) FROM hotels) as total_hotels,
  (SELECT COUNT(*) FROM rooms) as total_rooms,
  (SELECT COUNT(*) FROM bookings) as total_bookings,
  (SELECT COUNT(*) FROM users) as total_users;
```

---

## ⚠️ حل المشاكل الشائعة

### 1. خطأ: "password authentication failed"
```
❌ الحل: كلمة المرور غير صحيحة
✅ تأكد من كلمة المرور في ملف .env
```

### 2. خطأ: "database does not exist"
```
❌ الحل: لم يتم إنشاء قاعدة البيانات
✅ نفذ: CREATE DATABASE hotel_management;
```

### 3. خطأ: "psql is not recognized"
```
❌ الحل: PostgreSQL غير مضاف إلى PATH
✅ أضف: C:\Program Files\PostgreSQL\16\bin إلى PATH
```

### 4. خطأ: "port 5432 already in use"
```
❌ الحل: المنفذ مستخدم
✅ غير المنفذ في .env أو أوقف الخدمة الأخرى
```

### 5. خطأ: "could not connect to server"
```
❌ الحل: خدمة PostgreSQL متوقفة
✅ افتح Services.msc وابحث عن "postgresql-x64-16"
✅ اضغط Start
```

---

## 🎯 إضافة PostgreSQL إلى PATH بشكل دائم

### Windows 10/11:

1. **اضغط `Win + X` واختر "System"**

2. **اضغط "Advanced system settings"**

3. **اضغط "Environment Variables"**

4. **في "System variables" ابحث عن "Path"**

5. **اضغط "Edit"**

6. **اضغط "New" وأضف:**
   ```
   C:\Program Files\PostgreSQL\16\bin
   ```

7. **OK → OK → OK**

8. **أعد فتح PowerShell** لتطبيق التغييرات

---

## 📱 الحسابات الافتراضية بعد Seeding

```
Super Admin:
  Email: admin@hotelmanagement.com
  Password: Admin@123

Accountant:
  Email: accountant@hotelmanagement.com
  Password: Admin@123

Hotel Manager:
  Email: manager@hotelmanagement.com
  Password: Admin@123

Receptionist:
  Email: receptionist@hotelmanagement.com
  Password: Admin@123

Customer:
  Email: customer@example.com
  Password: Admin@123

Agent:
  Email: agent@hotelmanagement.com
  Password: Admin@123
```

---

## 🎉 الخطوة النهائية: تشغيل الـ Backend

```powershell
cd C:\Users\HS_RW\Desktop\hotel\backend
npm run dev
```

النتيجة:
```
✅ Server running on port 5000
✅ Database connected successfully
```

---

## 📚 موارد إضافية

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgAdmin 4 Documentation](https://www.pgadmin.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

---

**تم إعداد هذا الدليل بواسطة NINESOFT © 2025**

للدعم والمساعدة، راجع ملف `DATABASE_SCHEMA.md` للتفاصيل الكاملة عن قاعدة البيانات.
