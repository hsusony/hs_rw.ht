# 📊 قاعدة البيانات - هيكل شامل ومفصل

## 🎯 النظرة العامة

قاعدة بيانات PostgreSQL متكاملة لنظام إدارة الفنادق مع **30 جدول** و **تكامل كامل** بين جميع الوحدات.

---

## 📁 الجداول الرئيسية (Core Tables)

### 1. **users** - المستخدمون
إدارة جميع مستخدمي النظام بأدوارهم المختلفة.

```sql
- id (SERIAL PRIMARY KEY)
- email (VARCHAR UNIQUE) - البريد الإلكتروني
- password (VARCHAR) - كلمة المرور مشفرة
- first_name, last_name (VARCHAR) - الاسم بالعربي
- first_name_en, last_name_en (VARCHAR) - الاسم بالإنجليزي
- phone (VARCHAR)
- role (VARCHAR) - الدور في النظام:
  * super_admin - مدير النظام الأعلى
  * accountant - محاسب عام
  * representative - مندوب مبيعات
  * hotel_manager - مدير فندق
  * branch_manager - مدير فرع
  * hotel_accountant - محاسب فندق
  * receptionist - موظف استقبال
  * housekeeping - عامل نظافة
  * maintenance - فني صيانة
  * customer - عميل
- status (VARCHAR) - active/inactive/suspended
- created_at, updated_at (TIMESTAMP)
```

**الفهارس:**
- `idx_users_email` على email
- `idx_users_role` على role

---

### 2. **hotels** - الفنادق
معلومات الفنادق المسجلة في النظام.

```sql
- id (SERIAL PRIMARY KEY)
- name, name_en (VARCHAR) - اسم الفندق
- category (INTEGER 1-5) - تصنيف النجوم
- main_group, sub_group (VARCHAR) - المجموعة والمجموعة الفرعية
- total_rooms (INTEGER) - عدد الغرف (يتحدث تلقائياً)
- total_floors (INTEGER) - عدد الطوابق
- governorate, area (VARCHAR) - المحافظة والمنطقة
- address, phone, email (VARCHAR)
- description (TEXT) - الوصف
- amenities (JSONB) - المرافق: ['wifi', 'pool', 'gym', 'spa', ...]
- images (JSONB) - صور الفندق
- rating (DECIMAL) - التقييم من 0 إلى 5
- trial_start_date, trial_end_date (DATE) - فترة التجربة
- is_trial (BOOLEAN) - هل في فترة تجربة
- status (VARCHAR) - active/inactive/maintenance
- created_by (FK → users)
- created_at, updated_at (TIMESTAMP)
```

**الفهارس:**
- `idx_hotels_status` على status
- `idx_hotels_trial` على is_trial

**الـ Triggers:**
- `update_hotels_updated_at` - تحديث تلقائي لـ updated_at

---

### 3. **floors** - الطوابق ⭐ جديد
إدارة طوابق الفندق.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- floor_number (INTEGER) - رقم الطابق
- floor_name, floor_name_en (VARCHAR) - اسم الطابق
- total_rooms (INTEGER) - عدد الغرف في الطابق
- description (TEXT)
- status (VARCHAR) - active/inactive/maintenance
- created_at, updated_at (TIMESTAMP)
- UNIQUE(hotel_id, floor_number)
```

---

### 4. **room_types** - أنواع الغرف ⭐ جديد
تعريف أنواع الغرف المختلفة.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- type_name, type_name_en (VARCHAR) - نوع الغرفة
- description (TEXT)
- base_price (DECIMAL) - السعر الأساسي
- max_guests (INTEGER) - أقصى عدد نزلاء
- amenities (JSONB) - المرافق الخاصة
- images (JSONB)
- status (VARCHAR) - active/inactive
- created_at, updated_at (TIMESTAMP)
```

---

### 5. **halls** - القاعات والصالات ⭐ جديد
إدارة قاعات الفندق (احتفالات، مؤتمرات، الخ).

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- hall_name, hall_name_en (VARCHAR)
- capacity (INTEGER) - السعة القصوى
- price_per_hour, price_per_day (DECIMAL)
- amenities (JSONB)
- description (TEXT)
- images (JSONB)
- status (VARCHAR) - active/inactive/maintenance
- created_at, updated_at (TIMESTAMP)
```

---

### 6. **rooms** - الغرف
معلومات غرف الفندق.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- floor_id (FK → floors) SET NULL ⭐ جديد
- room_type_id (FK → room_types) SET NULL ⭐ جديد
- hall_id (FK → halls) SET NULL ⭐ جديد (للغرف المرتبطة بقاعة)
- room_number (VARCHAR) - رقم الغرفة
- floor (INTEGER) - رقم الطابق
- room_type (VARCHAR) - نوع الغرفة
- price_per_night (DECIMAL) - السعر لليلة
- size (INTEGER) - المساحة بالمتر المربع
- beds (INTEGER) - عدد الأسرة
- capacity (INTEGER) - السعة
- amenities (JSONB) - المرافق
- status (VARCHAR):
  * available - متاحة
  * occupied - مشغولة
  * maintenance - صيانة
  * cleaning - تنظيف
  * reserved - محجوزة
  * unavailable - غير متاحة
- created_at, updated_at (TIMESTAMP)
- UNIQUE(hotel_id, room_number)
```

**الفهارس:**
- `idx_rooms_hotel_id` على hotel_id
- `idx_rooms_status` على status
- `idx_rooms_floor_id` على floor_id

**الـ Triggers:**
- `update_hotel_rooms_count` - تحديث عدد الغرف في جدول hotels تلقائياً

---

### 7. **customers** - العملاء
بيانات العملاء الشخصية.

```sql
- id (SERIAL PRIMARY KEY)
- user_id (FK → users) CASCADE
- customer_type (VARCHAR) ⭐ جديد:
  * temporary - عميل مؤقت
  * permanent - عميل دائم
  * corporate - عميل مؤسسي
- date_of_birth (DATE)
- nationality (VARCHAR)
- passport_number, id_number (VARCHAR)
- address, city, country (VARCHAR)
- preferences (JSONB) - التفضيلات
- loyalty_points (INTEGER) - نقاط الولاء
- created_at, updated_at (TIMESTAMP)
```

---

### 8. **permanent_customers** - العملاء الدائمون ⭐ جديد
إدارة العملاء الدائمين مع عقود وخصومات خاصة.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- customer_id (FK → customers) CASCADE
- discount_percentage (DECIMAL) - نسبة الخصم
- special_services (JSONB) - خدمات خاصة
- contract_start, contract_end (DATE)
- notes (TEXT)
- status (VARCHAR) - active/inactive/expired
- created_at, updated_at (TIMESTAMP)
- UNIQUE(hotel_id, customer_id)
```

---

### 9. **booking_apps** - تطبيقات الحجز الخارجية ⭐ جديد
ربط مع منصات الحجز الإلكترونية.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- app_name, app_name_en (VARCHAR) - اسم التطبيق
- commission_rate (DECIMAL) - نسبة العمولة
- api_key, api_secret (VARCHAR) - بيانات API
- is_active (BOOLEAN)
- total_bookings (INTEGER) - عدد الحجوزات الإجمالي
- total_commission (DECIMAL) - العمولات الإجمالية
- created_at, updated_at (TIMESTAMP)
```

---

### 10. **bookings** - الحجوزات
حجوزات العملاء للغرف.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- room_id (FK → rooms) SET NULL
- customer_id (FK → customers) CASCADE
- booking_app_id (FK → booking_apps) SET NULL ⭐ جديد
- booking_source (VARCHAR) ⭐ جديد:
  * direct - مباشر
  * phone - هاتفي
  * website - موقع إلكتروني
  * app - تطبيق خارجي
  * agent - عن طريق وكيل
- check_in, check_out (DATE)
- guests (INTEGER)
- total_nights (INTEGER)
- price_per_night, total_price (DECIMAL)
- booking_status (VARCHAR):
  * pending - قيد الانتظار
  * confirmed - مؤكد
  * checked_in - تم تسجيل الوصول
  * checked_out - تم المغادرة
  * cancelled - ملغي
- payment_status (VARCHAR):
  * pending - قيد الانتظار
  * partial - دفع جزئي
  * paid - مدفوع
  * refunded - مسترجع
- special_requests (TEXT)
- created_by (FK → users)
- created_at, updated_at (TIMESTAMP)
```

**الفهارس:**
- `idx_bookings_customer_id`
- `idx_bookings_hotel_id`
- `idx_bookings_status`
- `idx_bookings_dates` على (check_in, check_out)

---

### 11. **app_commissions** - عمولات التطبيقات ⭐ جديد
تتبع العمولات من منصات الحجز الخارجية.

```sql
- id (SERIAL PRIMARY KEY)
- booking_app_id (FK → booking_apps) CASCADE
- booking_id (FK → bookings) CASCADE
- commission_amount (DECIMAL) - مبلغ العمولة
- commission_rate (DECIMAL) - نسبة العمولة
- booking_amount (DECIMAL) - مبلغ الحجز
- payment_status (VARCHAR) - pending/paid/cancelled
- payment_date (DATE)
- notes (TEXT)
- created_at, updated_at (TIMESTAMP)
```

---

### 12. **additional_services** - الخدمات الإضافية ⭐ جديد
خدمات إضافية يمكن للعملاء طلبها.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- service_name, service_name_en (VARCHAR)
- service_type (VARCHAR):
  * food - طعام
  * laundry - غسيل
  * transport - نقل
  * spa - سبا
  * gym - رياضة
  * other - أخرى
- price (DECIMAL)
- description (TEXT)
- icon (VARCHAR) - أيقونة FontAwesome
- status (VARCHAR) - active/inactive
- created_at, updated_at (TIMESTAMP)
```

---

### 13. **service_requests** - طلبات الخدمة
طلبات خدمة الغرف والشكاوى.

```sql
- id (SERIAL PRIMARY KEY)
- booking_id (FK → bookings) CASCADE
- customer_id (FK → customers) CASCADE
- hotel_id (FK → hotels) CASCADE
- request_type (VARCHAR):
  * room_service - خدمة الغرف
  * cleaning - تنظيف
  * complaint - شكوى
  * maintenance - صيانة
- description (TEXT)
- items (JSONB) - العناصر المطلوبة
- priority (VARCHAR) - low/normal/high/urgent
- status (VARCHAR) - pending/in_progress/completed/cancelled
- assigned_to (FK → users)
- total_amount (DECIMAL)
- images (JSONB)
- response (TEXT)
- completed_at (TIMESTAMP)
- created_at, updated_at (TIMESTAMP)
```

**الفهارس:**
- `idx_service_requests_type`
- `idx_service_requests_status`

---

## 💰 الإدارة المالية (Financial Management)

### 14. **payment_methods** - طرق الدفع
تعريف طرق الدفع المتاحة.

```sql
- id (SERIAL PRIMARY KEY)
- name_ar, name_en (VARCHAR)
- method_type (VARCHAR) - نقد/بنك/محفظة إلكترونية
- icon (VARCHAR)
- account_numbers (JSONB) - أرقام الحسابات
- status (VARCHAR) - active/inactive
- created_at, updated_at (TIMESTAMP)
```

---

### 15. **payments** - قسائم الدفع
سندات القبض والصرف.

```sql
- id (SERIAL PRIMARY KEY)
- voucher_number (VARCHAR UNIQUE) - رقم القسيمة
- voucher_type (VARCHAR):
  * receipt - سند قبض
  * payment - سند دفع
  * disbursement - سند صرف
- hotel_id (FK → hotels) SET NULL
- amount (DECIMAL)
- payment_method (VARCHAR)
- payment_date (DATE)
- beneficiary (VARCHAR) - المستفيد
- description (TEXT)
- reference_number (VARCHAR)
- status (VARCHAR) - pending/completed/cancelled
- created_by (FK → users)
- created_at, updated_at (TIMESTAMP)
```

**الفهارس:**
- `idx_payments_voucher_type`
- `idx_payments_hotel_id`

---

### 16. **expense_accounts** - حسابات المصروفات ⭐ جديد
تصنيف المصروفات.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- account_name, account_name_en (VARCHAR)
- account_type (VARCHAR):
  * salary - رواتب
  * utilities - مرافق
  * maintenance - صيانة
  * supplies - مستلزمات
  * marketing - تسويق
  * other - أخرى
- description (TEXT)
- status (VARCHAR) - active/inactive
- created_at, updated_at (TIMESTAMP)
```

---

### 17. **subscriptions** - الاشتراكات
اشتراكات الفنادق في النظام.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- subscription_type (VARCHAR) - monthly/annual
- start_date, end_date (DATE)
- trial_days (INTEGER)
- discount_percentage (DECIMAL)
- base_price, final_price (DECIMAL)
- status (VARCHAR) - active/expired/cancelled/suspended
- created_by (FK → users)
- created_at, updated_at (TIMESTAMP)
```

---

### 18. **trial_periods** - فترات التجربة ⭐ جديد
تتبع فترات التجربة المجانية.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- start_date, end_date (DATE)
- trial_days (INTEGER)
- features_enabled (JSONB) - المزايا المفعلة
- is_active (BOOLEAN)
- converted_to_paid (BOOLEAN) - تم التحويل لمدفوع
- conversion_date (DATE)
- notes (TEXT)
- created_at, updated_at (TIMESTAMP)
```

---

## 👥 إدارة الموظفين والشركاء

### 19. **agents** - المندوبون
مندوبو المبيعات والتسويق.

```sql
- id (SERIAL PRIMARY KEY)
- user_id (FK → users) CASCADE
- commission_rate (DECIMAL) - نسبة العمولة
- agent_type (VARCHAR) - نوع المندوب
- area (VARCHAR) - المنطقة المسؤول عنها
- total_hotels_added (INTEGER)
- total_commission (DECIMAL)
- created_at, updated_at (TIMESTAMP)
```

---

### 20. **partners** - الشركاء ⭐ جديد
شركاء الفندق (موردين، وكالات، الخ).

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- partner_name, partner_name_en (VARCHAR)
- partner_type (VARCHAR):
  * supplier - مورد
  * agency - وكالة
  * corporate - مؤسسة
  * other - أخرى
- contact_person (VARCHAR)
- phone, email (VARCHAR)
- address (TEXT)
- commission_rate (DECIMAL)
- contract_start, contract_end (DATE)
- notes (TEXT)
- status (VARCHAR) - active/inactive/suspended
- created_at, updated_at (TIMESTAMP)
```

---

### 21. **housekeeping** - النظافة
مهام التنظيف والتدبير المنزلي.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- room_id (FK → rooms) CASCADE
- assigned_to (FK → users)
- task_type (VARCHAR)
- priority (VARCHAR) - low/normal/high/urgent
- status (VARCHAR) - pending/in_progress/completed/verified
- started_at, completed_at (TIMESTAMP)
- notes (TEXT)
- created_at, updated_at (TIMESTAMP)
```

---

### 22. **maintenance** - الصيانة
طلبات وأعمال الصيانة.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- room_id (FK → rooms) CASCADE
- assigned_to (FK → users)
- issue_type (VARCHAR)
- issue_description (TEXT)
- priority (VARCHAR) - low/normal/high/urgent
- status (VARCHAR):
  * reported - مُبلغ عنها
  * assigned - مُسندة
  * in_progress - قيد التنفيذ
  * completed - مكتملة
  * verified - تم التحقق
- reported_by (FK → users)
- reported_at, started_at, completed_at (TIMESTAMP)
- cost (DECIMAL)
- notes (TEXT)
- created_at, updated_at (TIMESTAMP)
```

---

## 📦 إدارة المخزون (Inventory Management)

### 23. **warehouses** - المستودعات ⭐ جديد
مستودعات الفندق.

```sql
- id (SERIAL PRIMARY KEY)
- hotel_id (FK → hotels) CASCADE
- warehouse_name, warehouse_name_en (VARCHAR)
- location (VARCHAR)
- manager_id (FK → users)
- description (TEXT)
- status (VARCHAR) - active/inactive
- created_at, updated_at (TIMESTAMP)
```

---

### 24. **inventory_items** - بنود المخزون ⭐ جديد
عناصر المخزون والمستلزمات.

```sql
- id (SERIAL PRIMARY KEY)
- warehouse_id (FK → warehouses) CASCADE
- item_name, item_name_en (VARCHAR)
- item_code (VARCHAR UNIQUE)
- category (VARCHAR):
  * food - أطعمة
  * beverage - مشروبات
  * cleaning - تنظيف
  * maintenance - صيانة
  * linen - بياضات
  * amenities - لوازم الضيافة
  * other - أخرى
- unit (VARCHAR) - الوحدة (كغم، قطعة، لتر، الخ)
- quantity (DECIMAL) - الكمية الحالية
- min_quantity (DECIMAL) - الحد الأدنى
- max_quantity (DECIMAL) - الحد الأقصى
- unit_price (DECIMAL) - سعر الوحدة
- total_value (DECIMAL) - القيمة الإجمالية (تلقائي)
- supplier (VARCHAR)
- last_purchase_date (DATE)
- expiry_date (DATE)
- notes (TEXT)
- created_at, updated_at (TIMESTAMP)
```

**الفهارس:**
- `idx_inventory_items_code`
- `idx_inventory_items_warehouse`

**الـ Triggers:**
- `update_inventory_value` - حساب القيمة الإجمالية تلقائياً

---

### 25. **stock_issues** - صرف المخزون ⭐ جديد
سندات صرف العناصر من المخزن.

```sql
- id (SERIAL PRIMARY KEY)
- warehouse_id (FK → warehouses) CASCADE
- inventory_item_id (FK → inventory_items) CASCADE
- issue_number (VARCHAR UNIQUE) - رقم سند الصرف
- quantity (DECIMAL)
- unit_price (DECIMAL)
- total_value (DECIMAL)
- department (VARCHAR) - القسم المستلم
- issued_to (FK → users) - المستلم
- issued_by (FK → users) - المصدر
- issue_date (DATE)
- notes (TEXT)
- created_at, updated_at (TIMESTAMP)
```

**الفهارس:**
- `idx_stock_issues_date`

**الـ Triggers:**
- `update_inventory_after_issue` - خصم الكمية من المخزون تلقائياً

---

### 26. **purchase_invoices** - فواتير الشراء ⭐ جديد
فواتير شراء المستلزمات.

```sql
- id (SERIAL PRIMARY KEY)
- warehouse_id (FK → warehouses) CASCADE
- invoice_number (VARCHAR UNIQUE)
- supplier_name (VARCHAR)
- supplier_phone (VARCHAR)
- invoice_date (DATE)
- payment_method (VARCHAR)
- subtotal (DECIMAL) - المجموع الفرعي
- tax_amount (DECIMAL) - الضريبة
- discount_amount (DECIMAL) - الخصم
- total_amount (DECIMAL) - الإجمالي
- payment_status (VARCHAR) - pending/partial/paid
- notes (TEXT)
- created_by (FK → users)
- created_at, updated_at (TIMESTAMP)
```

**الفهارس:**
- `idx_purchase_invoices_date`

---

### 27. **purchase_invoice_items** - بنود فواتير الشراء ⭐ جديد
تفاصيل عناصر كل فاتورة شراء.

```sql
- id (SERIAL PRIMARY KEY)
- invoice_id (FK → purchase_invoices) CASCADE
- inventory_item_id (FK → inventory_items) CASCADE
- quantity (DECIMAL)
- unit_price (DECIMAL)
- total_price (DECIMAL)
- created_at (TIMESTAMP)
```

---

## 📝 السجلات والتدقيق (Logging & Auditing)

### 28. **activity_logs** - سجل النشاطات
تتبع جميع العمليات في النظام.

```sql
- id (SERIAL PRIMARY KEY)
- user_id (FK → users) SET NULL
- action (VARCHAR) - نوع العملية
- entity_type (VARCHAR) - نوع الكيان
- entity_id (INTEGER) - معرف الكيان
- details (JSONB) - تفاصيل إضافية
- ip_address (VARCHAR)
- created_at (TIMESTAMP)
```

---

## 🔧 الـ Triggers والوظائف التلقائية

### 1. تحديث updated_at تلقائياً
```sql
CREATE FUNCTION update_updated_at_column()
```
يطبق على **جميع الجداول** التي تحتوي على `updated_at`.

### 2. تحديث عدد الغرف
```sql
CREATE FUNCTION update_hotel_total_rooms()
```
تحديث `hotels.total_rooms` تلقائياً عند إضافة/حذف/نقل غرفة.

### 3. حساب القيمة الإجمالية للمخزون
```sql
CREATE FUNCTION update_inventory_total_value()
```
حساب `total_value = quantity × unit_price` تلقائياً.

### 4. خصم من المخزون عند الصرف
```sql
CREATE FUNCTION update_inventory_on_issue()
```
خصم الكمية من `inventory_items` عند إصدار سند صرف.

---

## 📊 الإحصائيات والتقارير

### ملخص الجداول:
- **30 جدول** إجمالي
- **15 جدول جديد** تمت إضافتها
- **42 Foreign Key** للربط بين الجداول
- **19 Index** لتحسين الأداء
- **4 Triggers** للعمليات التلقائية
- **4 Functions** مخصصة

### التغطية الوظيفية:
✅ إدارة المستخدمين والصلاحيات  
✅ إدارة الفنادق والغرف والطوابق  
✅ نظام الحجوزات المتكامل  
✅ إدارة العملاء والولاء  
✅ النظام المالي الكامل  
✅ إدارة المخزون والمشتريات  
✅ إدارة الموظفين والمهام  
✅ الصيانة والنظافة  
✅ الشركاء والوكلاء  
✅ تطبيقات الحجز الخارجية  
✅ فترات التجربة والاشتراكات  
✅ القاعات والصالات  
✅ الخدمات الإضافية  
✅ السجلات والتدقيق  

---

## 🔗 العلاقات بين الجداول

### علاقات One-to-Many الرئيسية:
- `hotels` → `rooms`, `floors`, `halls`, `subscriptions`, `bookings`
- `users` → `bookings`, `service_requests`, `activity_logs`
- `customers` → `bookings`, `service_requests`
- `warehouses` → `inventory_items`, `stock_issues`, `purchase_invoices`
- `booking_apps` → `bookings`, `app_commissions`

### علاقات Many-to-Many:
- `hotels` ↔ `customers` (عبر `permanent_customers`)
- `hotels` ↔ `booking_apps`
- `purchase_invoices` ↔ `inventory_items` (عبر `purchase_invoice_items`)

---

## 🚀 الأداء والتحسينات

### الفهارس (Indexes):
- فهارس على المفاتيح الخارجية
- فهارس على الحقول المستخدمة في البحث والفلترة
- فهارس على التواريخ للتقارير السريعة

### التشغيل التلقائي:
- تحديث الأختام الزمنية
- حساب القيم المجمعة
- إدارة المخزون التلقائية
- تحديث العدادات

### الأمان:
- CASCADE لحذف البيانات المرتبطة
- SET NULL للحفاظ على السجلات التاريخية
- CHECK constraints للتحقق من القيم
- UNIQUE constraints لمنع التكرار

---

تم بحمد الله إنشاء قاعدة بيانات شاملة ومتكاملة! ✨

Last Updated: November 20, 2025
