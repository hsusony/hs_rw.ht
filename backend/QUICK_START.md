# Quick Start Guide
# دليل البدء السريع

## 🚀 البدء السريع / Quick Start

### المتطلبات الأساسية / Prerequisites
1. ✅ Node.js v14+ installed
2. ✅ PostgreSQL 12+ installed and running
3. ✅ npm or yarn package manager

---

## 📦 خطوات التثبيت / Installation Steps

### الخطوة 1: تثبيت المكتبات / Install Dependencies

```powershell
cd backend
npm install
```

انتظر حتى يتم تثبيت جميع المكتبات...

---

### الخطوة 2: إنشاء قاعدة البيانات / Create Database

افتح PostgreSQL وأنشئ قاعدة البيانات:

```sql
CREATE DATABASE hotel_management;
```

أو استخدم pgAdmin لإنشاء قاعدة بيانات جديدة باسم `hotel_management`

---

### الخطوة 3: إعداد ملف البيئة / Setup Environment

انسخ `.env.example` إلى `.env`:

```powershell
copy .env.example .env
```

افتح ملف `.env` وعدل الإعدادات:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration - عدل هذه القيم
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_management
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD_HERE    # ضع كلمة مرور PostgreSQL هنا

# JWT Configuration - مهم جداً!
JWT_SECRET=CHANGE_THIS_TO_RANDOM_STRING    # غير هذا لمفتاح عشوائي قوي
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

⚠️ **مهم:** غير `JWT_SECRET` إلى نص عشوائي قوي!

---

### الخطوة 4: إنشاء الجداول / Initialize Database Tables

```powershell
npm run init-db
```

يجب أن ترى:
```
✅ Database connected successfully
✅ Database tables created successfully
✅ Database initialization completed
```

---

### الخطوة 5: تشغيل السيرفر / Start Server

**للتطوير / Development:**
```powershell
npm run dev
```

**للإنتاج / Production:**
```powershell
npm start
```

يجب أن ترى:
```
🚀 Server running on port 5000
📡 Environment: development
🌐 API URL: http://localhost:5000/api
✅ Database connected successfully
```

---

## ✅ اختبار النظام / Test the System

### 1. افحص صحة السيرفر / Check Server Health

افتح المتصفح واذهب إلى:
```
http://localhost:5000/api/health
```

يجب أن ترى:
```json
{
  "status": "OK",
  "message": "Hotel Management API is running",
  "timestamp": "2025-11-20T..."
}
```

### 2. اختبار التسجيل / Test Registration

استخدم Postman أو أي API client:

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123456",
  "first_name": "أحمد",
  "last_name": "محمد",
  "first_name_en": "Ahmed",
  "last_name_en": "Mohammed",
  "phone": "07701234567"
}
```

### 3. اختبار تسجيل الدخول / Test Login

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123456"
}
```

يجب أن تحصل على token. احفظه لاستخدامه في الطلبات الأخرى.

---

## 🔑 استخدام الـ Token / Using the Token

في جميع الطلبات التي تحتاج مصادقة، أضف header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

مثال في Postman:
1. اذهب إلى Headers
2. أضف: Key = `Authorization`, Value = `Bearer YOUR_TOKEN`

---

## 📊 الخطوات التالية / Next Steps

1. ✅ تثبيت Frontend
2. ✅ ربط Frontend مع Backend
3. ✅ إنشاء حسابات المستخدمين
4. ✅ إضافة الفنادق والغرف
5. ✅ البدء في استخدام النظام

---

## 🐛 حل المشاكل الشائعة / Troubleshooting

### مشكلة: لا يمكن الاتصال بقاعدة البيانات
**الحل:**
1. تأكد أن PostgreSQL يعمل
2. تحقق من username و password في `.env`
3. تحقق من اسم قاعدة البيانات

### مشكلة: Error: Cannot find module
**الحل:**
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### مشكلة: Port already in use
**الحل:**
1. غير PORT في `.env` إلى رقم آخر (مثلاً 5001)
2. أو أوقف التطبيق الآخر الذي يستخدم المنفذ 5000

### مشكلة: JWT_SECRET is not defined
**الحل:**
تأكد من وجود `JWT_SECRET` في ملف `.env`

---

## 📱 الوصول إلى API / Accessing the API

### Base URL
```
http://localhost:5000/api
```

### الـ Endpoints الرئيسية / Main Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | تسجيل مستخدم جديد |
| `/api/auth/login` | POST | تسجيل الدخول |
| `/api/hotels` | GET | قائمة الفنادق |
| `/api/rooms` | GET | قائمة الغرف |
| `/api/bookings` | GET/POST | الحجوزات |
| `/api/payments/vouchers` | GET/POST | السندات |

للمزيد من التفاصيل، راجع `API_DOCUMENTATION.md`

---

## 💡 نصائح / Tips

1. **للتطوير:** استخدم `npm run dev` للإعادة التلقائية عند التغيير
2. **Postman:** استخدم Postman لاختبار الـ API بسهولة
3. **Logs:** تحقق من مجلد `logs/` لرؤية سجلات الأخطاء
4. **Database:** استخدم pgAdmin لإدارة قاعدة البيانات بصورة مرئية

---

## 📞 الدعم / Support

إذا واجهت أي مشاكل:
1. راجع ملف `README.md`
2. راجع ملف `API_DOCUMENTATION.md`
3. تحقق من ملف `logs/error.log`
4. تواصل مع فريق NineSoft

---

## ✨ جاهز! / You're Ready!

الآن النظام جاهز للاستخدام! 🎉

يمكنك:
- ✅ إضافة الفنادق
- ✅ إدارة الغرف
- ✅ استقبال الحجوزات
- ✅ إدارة المدفوعات
- ✅ تتبع الصيانة والتنظيف
- ✅ إنشاء التقارير

**Happy Coding! 🚀**

---

**NineSoft Hotel Management System**  
**Version 1.0.0**
