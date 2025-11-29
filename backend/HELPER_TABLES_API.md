# Helper Tables API Documentation

## Overview
هذا الملف يوثق الـ APIs الخاصة بالجداول المساعدة التي تم إضافتها للنظام.

---

## 1. Floors API (الطوابق)

### Base URL: `/api/floors`

#### 1.1 Get All Floors for Hotel
```
GET /api/floors/hotel/:hotelId
Headers: Authorization: Bearer {token}
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "hotel_id": 1,
      "floor_number": 1,
      "floor_name": "الطابق الأول",
      "floor_name_en": "First Floor",
      "total_rooms": 10,
      "description": "طابق استقبال وغرف عادية",
      "status": "active",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 1.2 Get Floors with Room Count
```
GET /api/floors/hotel/:hotelId/with-count
Headers: Authorization: Bearer {token}
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "floor_name": "الطابق الأول",
      "total_rooms": 10,
      "actual_room_count": "8"
    }
  ]
}
```

#### 1.3 Get Single Floor
```
GET /api/floors/:id
Headers: Authorization: Bearer {token}
```

#### 1.4 Create New Floor
```
POST /api/floors
Headers: Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "hotel_id": 1,
  "floor_number": 5,
  "floor_name": "الطابق الخامس",
  "floor_name_en": "Fifth Floor",
  "total_rooms": 12,
  "description": "طابق فاخر",
  "status": "active"
}
```

#### 1.5 Update Floor
```
PUT /api/floors/:id
Headers: Authorization: Bearer {token}
Content-Type: application/json
```

#### 1.6 Delete Floor
```
DELETE /api/floors/:id
Headers: Authorization: Bearer {token}
```

---

## 2. Room Types API (أنواع الغرف)

### Base URL: `/api/room-types`

#### 2.1 Get All Room Types for Hotel
```
GET /api/room-types/hotel/:hotelId
Headers: Authorization: Bearer {token}
```

#### 2.2 Get Room Types with Room Count
```
GET /api/room-types/hotel/:hotelId/with-count
Headers: Authorization: Bearer {token}
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type_name": "غرفة مفردة",
      "type_name_en": "Single Room",
      "base_price": "50000",
      "room_count": "5"
    }
  ]
}
```

#### 2.3 Get Single Room Type
```
GET /api/room-types/:id
Headers: Authorization: Bearer {token}
```

#### 2.4 Create New Room Type
```
POST /api/room-types
Headers: Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "hotel_id": 1,
  "type_name": "جناح رئاسي",
  "type_name_en": "Presidential Suite",
  "description": "جناح فاخر مع إطلالة رائعة",
  "base_price": 500000,
  "max_guests": 4,
  "amenities": ["wifi", "tv", "minibar", "balcony"],
  "images": ["suite1.jpg", "suite2.jpg"],
  "status": "active"
}
```

#### 2.5 Update Room Type
```
PUT /api/room-types/:id
```

#### 2.6 Delete Room Type
```
DELETE /api/room-types/:id
```

---

## 3. Halls API (القاعات)

### Base URL: `/api/halls`

#### 3.1 Get All Halls for Hotel
```
GET /api/halls/hotel/:hotelId
Headers: Authorization: Bearer {token}
```

#### 3.2 Get Single Hall
```
GET /api/halls/:id
```

#### 3.3 Create New Hall
```
POST /api/halls
Headers: Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "hotel_id": 1,
  "hall_name": "قاعة الزهراء",
  "hall_name_en": "Al-Zahra Hall",
  "capacity": 200,
  "price_per_hour": 100000,
  "price_per_day": 2000000,
  "amenities": ["projector", "sound_system", "ac"],
  "description": "قاعة كبيرة للمؤتمرات والحفلات",
  "images": ["hall1.jpg"],
  "status": "active"
}
```

#### 3.4 Update Hall
```
PUT /api/halls/:id
```

#### 3.5 Delete Hall
```
DELETE /api/halls/:id
```

#### 3.6 Check Hall Availability
```
POST /api/halls/:id/check-availability
Headers: Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "date": "2024-02-15",
  "hours": 4
}
```

---

## 4. Additional Services API (الخدمات الإضافية)

### Base URL: `/api/additional-services`

#### 4.1 Get All Services for Hotel
```
GET /api/additional-services/hotel/:hotelId
Headers: Authorization: Bearer {token}
Query Parameters: ?service_type=food&status=active
```

#### 4.2 Get Services by Type
```
GET /api/additional-services/hotel/:hotelId/type/:serviceType
Headers: Authorization: Bearer {token}

Service Types: food, laundry, transportation, entertainment, spa, other
```

#### 4.3 Get Single Service
```
GET /api/additional-services/:id
```

#### 4.4 Create New Service
```
POST /api/additional-services
Headers: Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "hotel_id": 1,
  "service_name": "خدمة الغرف",
  "service_name_en": "Room Service",
  "service_type": "food",
  "price": 25000,
  "description": "توصيل الطعام للغرف على مدار الساعة",
  "icon": "room-service-icon",
  "status": "active"
}
```

#### 4.5 Update Service
```
PUT /api/additional-services/:id
```

#### 4.6 Delete Service
```
DELETE /api/additional-services/:id
```

---

## 5. Warehouses API (المستودعات)

### Base URL: `/api/warehouses`

#### 5.1 Get All Warehouses for Hotel
```
GET /api/warehouses/hotel/:hotelId
Headers: Authorization: Bearer {token}
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "hotel_id": 1,
      "warehouse_name": "المستودع الرئيسي",
      "warehouse_name_en": "Main Warehouse",
      "location": "الطابق السفلي - B1",
      "manager_id": 5,
      "manager_name": "أحمد محمد",
      "status": "active"
    }
  ]
}
```

#### 5.2 Get Single Warehouse
```
GET /api/warehouses/:id
```

#### 5.3 Get Warehouse Inventory Summary
```
GET /api/warehouses/:id/summary
Headers: Authorization: Bearer {token}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "total_items": "150",
    "total_value": "5000000",
    "low_stock_items": "12",
    "expired_items": "3"
  }
}
```

#### 5.4 Create New Warehouse
```
POST /api/warehouses
Headers: Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "hotel_id": 1,
  "warehouse_name": "مستودع المطبخ",
  "warehouse_name_en": "Kitchen Warehouse",
  "location": "الطابق السفلي - B2",
  "manager_id": 5,
  "description": "مستودع خاص بمستلزمات المطبخ",
  "status": "active"
}
```

#### 5.5 Update Warehouse
```
PUT /api/warehouses/:id
```

#### 5.6 Delete Warehouse
```
DELETE /api/warehouses/:id
```

---

## 6. Inventory Items API (أصناف المخزون)

### Base URL: `/api/inventory`

#### 6.1 Get All Items in Warehouse
```
GET /api/inventory/warehouse/:warehouseId
Headers: Authorization: Bearer {token}
Query Parameters: ?category=food&low_stock=true&expired=true
```

#### 6.2 Get Low Stock Items
```
GET /api/inventory/warehouse/:warehouseId/low-stock
Headers: Authorization: Bearer {token}
```

#### 6.3 Get Expired Items
```
GET /api/inventory/warehouse/:warehouseId/expired
Headers: Authorization: Bearer {token}
```

#### 6.4 Get Single Item
```
GET /api/inventory/:id
```

#### 6.5 Get Item by Code
```
GET /api/inventory/code/:itemCode
Headers: Authorization: Bearer {token}
```

#### 6.6 Create New Item
```
POST /api/inventory
Headers: Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "warehouse_id": 1,
  "item_name": "أرز بسمتي",
  "item_name_en": "Basmati Rice",
  "item_code": "RICE-001",
  "category": "food",
  "unit": "كيس 25 كغ",
  "quantity": 50,
  "min_quantity": 10,
  "max_quantity": 100,
  "unit_price": 45000,
  "supplier": "شركة الحبوب العالمية",
  "last_purchase_date": "2024-01-15",
  "expiry_date": "2025-01-15",
  "notes": "تخزين في مكان جاف"
}
```

#### 6.7 Update Item
```
PUT /api/inventory/:id
```

#### 6.8 Update Item Quantity
```
PATCH /api/inventory/:id/quantity
Headers: Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "quantity_change": -5  // للطرح، أو 10 للإضافة
}
```

#### 6.9 Delete Item
```
DELETE /api/inventory/:id
```

---

## Authentication
جميع الـ Endpoints تتطلب Authentication Token في الـ Header:
```
Authorization: Bearer {your_jwt_token}
```

## Error Responses
```json
{
  "success": false,
  "message": "رسالة الخطأ بالعربية"
}
```

## Status Codes
- `200 OK` - العملية نجحت
- `201 Created` - تم الإنشاء بنجاح
- `400 Bad Request` - خطأ في البيانات المرسلة
- `401 Unauthorized` - غير مصرح
- `404 Not Found` - العنصر غير موجود
- `500 Internal Server Error` - خطأ في السيرفر

---

## Notes
1. جميع التواريخ بصيغة ISO 8601
2. الأسعار بالدينار العراقي (IQD)
3. الـ status يمكن أن يكون: active, inactive
4. جميع الـ IDs من نوع integer
5. الـ arrays مثل amenities و images تحفظ كـ JSON
