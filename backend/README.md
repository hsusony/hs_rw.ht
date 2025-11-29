# Hotel Management System - Backend API

## 📋 المتطلبات / Requirements

- Node.js v16+ 
- PostgreSQL 13+
- npm or yarn

## 🚀 التثبيت / Installation

### 1. تثبيت المكتبات / Install Dependencies

```powershell
cd backend
npm install
```

### 2. إعداد قاعدة البيانات / Database Setup

أولاً، قم بإنشاء قاعدة بيانات PostgreSQL:

```sql
CREATE DATABASE hotel_management;
```

### 3. إعداد ملف البيئة / Environment Configuration

انسخ ملف `.env.example` إلى `.env` وقم بتعديل القيم:

```powershell
copy .env.example .env
```

ثم افتح `.env` وعدّل:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_management
DB_USER=postgres
DB_PASSWORD=كلمة_المرور_الخاصة_بك

# JWT Configuration
JWT_SECRET=مفتاح_سري_قوي_هنا
```

### 4. إنشاء جداول قاعدة البيانات / Initialize Database Tables

```powershell
npm run init-db
```

### 5. تشغيل السيرفر / Start Server

**وضع التطوير / Development Mode:**
```powershell
npm run dev
```

**وضع الإنتاج / Production Mode:**
```powershell
npm start
```

السيرفر سيعمل على: `http://localhost:5000`

## 📡 API Endpoints

### Authentication (المصادقة)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | تسجيل مستخدم جديد / Register new user |
| POST | `/api/auth/login` | تسجيل الدخول / Login |
| GET | `/api/auth/me` | الحصول على بيانات المستخدم الحالي / Get current user |
| POST | `/api/auth/logout` | تسجيل الخروج / Logout |
| PUT | `/api/auth/change-password` | تغيير كلمة المرور / Change password |

### Hotels (الفنادق)

| Method | Endpoint | Description | Authorization |
|--------|----------|-------------|---------------|
| GET | `/api/hotels` | قائمة الفنادق / List hotels | Public |
| GET | `/api/hotels/:id` | تفاصيل فندق / Hotel details | Public |
| POST | `/api/hotels` | إضافة فندق / Create hotel | Super Admin |
| PUT | `/api/hotels/:id` | تحديث فندق / Update hotel | Super Admin, Hotel Manager |
| DELETE | `/api/hotels/:id` | حذف فندق / Delete hotel | Super Admin |

### Rooms (الغرف)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms?hotel_id=1` | قائمة الغرف / List rooms |
| GET | `/api/rooms/:id` | تفاصيل غرفة / Room details |
| POST | `/api/rooms` | إضافة غرفة / Create room |
| PUT | `/api/rooms/:id` | تحديث غرفة / Update room |
| DELETE | `/api/rooms/:id` | حذف غرفة / Delete room |

### Bookings (الحجوزات)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings/my-bookings` | حجوزاتي / My bookings |
| GET | `/api/bookings` | كل الحجوزات / All bookings |
| POST | `/api/bookings` | إنشاء حجز / Create booking |
| PUT | `/api/bookings/:id/status` | تحديث حالة / Update status |
| DELETE | `/api/bookings/:id` | إلغاء حجز / Cancel booking |

### Payments (المدفوعات)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments/vouchers` | قائمة السندات / List vouchers |
| POST | `/api/payments/vouchers` | إنشاء سند / Create voucher |
| GET | `/api/payments/methods` | طرق الدفع / Payment methods |
| POST | `/api/payments/methods` | إضافة طريقة دفع / Add payment method |
| PUT | `/api/payments/methods/:id` | تحديث طريقة دفع / Update payment method |
| GET | `/api/payments/stats` | إحصائيات المدفوعات / Payment statistics |

### Users (المستخدمين)

| Method | Endpoint | Description | Authorization |
|--------|----------|-------------|---------------|
| GET | `/api/users` | قائمة المستخدمين / List users | Super Admin |
| POST | `/api/users` | إنشاء مستخدم / Create user | Super Admin |
| PUT | `/api/users/:id` | تحديث مستخدم / Update user | Super Admin |
| DELETE | `/api/users/:id` | حذف مستخدم / Delete user | Super Admin |

### Subscriptions (الاشتراكات)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subscriptions` | قائمة الاشتراكات / List subscriptions |
| POST | `/api/subscriptions` | إنشاء اشتراك / Create subscription |
| PUT | `/api/subscriptions/:id/status` | تحديث الحالة / Update status |
| DELETE | `/api/subscriptions/:id` | حذف اشتراك / Delete subscription |

### Agents (المندوبين)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/agents` | قائمة المندوبين / List agents |
| GET | `/api/agents/:id/stats` | إحصائيات مندوب / Agent statistics |
| PUT | `/api/agents/:id/commission` | تحديث العمولة / Update commission |

### Housekeeping (التنظيف)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/housekeeping` | قائمة مهام التنظيف / List tasks |
| POST | `/api/housekeeping` | إنشاء مهمة / Create task |
| PUT | `/api/housekeeping/:id/status` | تحديث الحالة / Update status |

### Maintenance (الصيانة)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/maintenance` | قائمة مشاكل الصيانة / List issues |
| POST | `/api/maintenance` | الإبلاغ عن مشكلة / Report issue |
| PUT | `/api/maintenance/:id/status` | تحديث الحالة / Update status |

### Reports (التقارير)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/dashboard` | إحصائيات اللوحة / Dashboard stats |
| GET | `/api/reports/bookings` | تقرير الحجوزات / Bookings report |
| GET | `/api/reports/revenue` | تقرير الإيرادات / Revenue report |
| GET | `/api/reports/occupancy` | تقرير الإشغال / Occupancy report |

## 🔑 أدوار المستخدمين / User Roles

1. **super_admin** - مدير النظام / System Administrator
2. **accountant** - المحاسب العام / General Accountant
3. **representative** - مندوب المبيعات / Sales Representative
4. **hotel_manager** - مدير الفندق / Hotel Manager
5. **branch_manager** - مدير الفرع / Branch Manager
6. **hotel_accountant** - محاسب الفندق / Hotel Accountant
7. **receptionist** - موظف الاستقبال / Receptionist
8. **housekeeping** - موظف التنظيف / Housekeeping Staff
9. **maintenance** - موظف الصيانة / Maintenance Staff
10. **customer** - عميل / Customer

## 📊 Database Schema

### الجداول الرئيسية / Main Tables

- **users** - المستخدمين
- **hotels** - الفنادق
- **rooms** - الغرف
- **customers** - العملاء
- **bookings** - الحجوزات
- **subscriptions** - الاشتراكات
- **payments** - المدفوعات
- **payment_methods** - طرق الدفع (مع دعم أرقام حسابات متعددة)
- **agents** - المندوبين
- **housekeeping** - التنظيف
- **maintenance** - الصيانة
- **service_requests** - طلبات الخدمة
- **activity_logs** - سجل الأنشطة

## 🔒 Authentication

يستخدم النظام JWT (JSON Web Tokens) للمصادقة.

**استخدام Token:**

```javascript
// في رأس الطلب / In request header
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📝 أمثلة الاستخدام / Usage Examples

### تسجيل مستخدم جديد / Register New User

```javascript
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "123456",
  "first_name": "أحمد",
  "last_name": "محمد",
  "first_name_en": "Ahmed",
  "last_name_en": "Mohammed",
  "phone": "07701234567"
}
```

### إنشاء سند صرف / Create Disbursement Voucher

```javascript
POST http://localhost:5000/api/payments/vouchers
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "voucher_type": "disbursement",
  "amount": 1000,
  "payment_method": "نقدي",
  "payment_date": "2024-01-15",
  "beneficiary": "أحمد محمد",
  "description": "رواتب الموظفين"
}
```

### إضافة طريقة دفع مع أرقام حسابات متعددة

```javascript
POST http://localhost:5000/api/payments/methods
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name_ar": "بنك بغداد",
  "name_en": "Bank of Baghdad",
  "method_type": "بنك",
  "icon": "fa-university",
  "account_numbers": [
    "IQ98RAFI123456789",
    "IQ98RAFI987654321",
    "IQ98RAFI555666777"
  ]
}
```

## ⚠️ ملاحظات مهمة / Important Notes

1. **الأمان / Security**: غيّر `JWT_SECRET` في ملف `.env` لمفتاح قوي وفريد
2. **قاعدة البيانات / Database**: تأكد من تشغيل PostgreSQL قبل بدء السيرفر
3. **المنافذ / Ports**: السيرفر يعمل على المنفذ 5000، Frontend على 3000
4. **CORS**: مفعّل للسماح بالطلبات من `http://localhost:3000`

## 🛠️ تطوير / Development

### إضافة endpoint جديد:

1. أنشئ route في مجلد `routes/`
2. أضف الـ route في `server.js`
3. أضف middleware للمصادقة إذا لزم الأمر

### إضافة جدول جديد:

1. أضف SQL في `scripts/initDatabase.js`
2. أعد تشغيل `npm run init-db`

## 📞 الدعم / Support

للمساعدة والدعم، تواصل مع فريق التطوير في NineSoft

---

**NineSoft © 2024 - Hotel Management System**
