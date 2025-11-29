# API Documentation

## Overview
This document provides detailed information about the Hotel Management System API endpoints.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 1. Authentication & Authorization

### 1.1 Register New User
**Endpoint:** `POST /auth/register`  
**Access:** Public  
**Description:** Register a new customer account

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "Password123",
  "first_name": "أحمد",
  "last_name": "محمد",
  "first_name_en": "Ahmed",
  "last_name_en": "Mohammed",
  "phone": "07701234567"
}
```

**Response:** `201 Created`
```json
{
  "message": "تم التسجيل بنجاح / Registration successful",
  "user": {
    "id": 1,
    "email": "customer@example.com",
    "first_name": "أحمد",
    "last_name": "محمد",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.2 Login
**Endpoint:** `POST /auth/login`  
**Access:** Public

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "Password123"
}
```

**Response:** `200 OK`
```json
{
  "message": "تم تسجيل الدخول بنجاح / Login successful",
  "user": {
    "id": 1,
    "email": "customer@example.com",
    "first_name": "أحمد",
    "role": "customer",
    "status": "active"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.3 Get Current User
**Endpoint:** `GET /auth/me`  
**Access:** Authenticated

**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "email": "customer@example.com",
    "first_name": "أحمد",
    "last_name": "محمد",
    "role": "customer",
    "loyalty_points": 100
  }
}
```

### 1.4 Change Password
**Endpoint:** `PUT /auth/change-password`  
**Access:** Authenticated

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123"
}
```

---

## 2. Hotels

### 2.1 Get All Hotels
**Endpoint:** `GET /hotels`  
**Access:** Public

**Query Parameters:**
- `category` (optional): Filter by star rating (1-5)
- `governorate` (optional): Filter by governorate
- `area` (optional): Filter by area
- `minRating` (optional): Minimum rating
- `status` (optional): Filter by status (default: active)
- `search` (optional): Search by name
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /hotels?category=5&governorate=بغداد&page=1&limit=10
```

**Response:** `200 OK`
```json
{
  "hotels": [
    {
      "id": 1,
      "name": "فندق بغداد الكبير",
      "name_en": "Grand Baghdad Hotel",
      "category": 5,
      "governorate": "بغداد",
      "area": "الكرادة",
      "address": "شارع الكرادة الرئيسي",
      "rating": 4.5,
      "amenities": ["wifi", "pool", "gym"],
      "images": ["image1.jpg", "image2.jpg"]
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

### 2.2 Get Hotel by ID
**Endpoint:** `GET /hotels/:id`  
**Access:** Public

**Response:** `200 OK`
```json
{
  "hotel": {
    "id": 1,
    "name": "فندق بغداد الكبير",
    "category": 5,
    "total_rooms": 100,
    "rooms_stats": [
      { "status": "available", "count": "50" },
      { "status": "occupied", "count": "30" },
      { "status": "maintenance", "count": "5" }
    ]
  }
}
```

### 2.3 Create Hotel
**Endpoint:** `POST /hotels`  
**Access:** Super Admin

**Request Body:**
```json
{
  "name": "فندق بغداد الكبير",
  "name_en": "Grand Baghdad Hotel",
  "category": 5,
  "total_rooms": 100,
  "total_floors": 10,
  "governorate": "بغداد",
  "area": "الكرادة",
  "address": "شارع الكرادة الرئيسي",
  "phone": "07701234567",
  "email": "info@grandbaghdad.com",
  "description": "فندق فاخر في قلب بغداد",
  "amenities": ["wifi", "pool", "gym", "spa"],
  "images": ["image1.jpg", "image2.jpg"]
}
```

---

## 3. Rooms

### 3.1 Get All Rooms
**Endpoint:** `GET /rooms`  
**Access:** Public

**Query Parameters:**
- `hotel_id` (required): Hotel ID
- `status` (optional): Filter by status
- `floor` (optional): Filter by floor
- `room_type` (optional): Filter by room type
- `available_from` (optional): Check-in date
- `available_to` (optional): Check-out date

**Example Request:**
```
GET /rooms?hotel_id=1&status=available&floor=5
```

### 3.2 Create Room
**Endpoint:** `POST /rooms`  
**Access:** Super Admin, Hotel Manager

**Request Body:**
```json
{
  "hotel_id": 1,
  "room_number": "501",
  "floor": 5,
  "room_type": "deluxe",
  "price_per_night": 150000,
  "size": 35,
  "beds": 2,
  "capacity": 3,
  "amenities": ["tv", "minibar", "balcony"]
}
```

---

## 4. Bookings

### 4.1 Get My Bookings
**Endpoint:** `GET /bookings/my-bookings`  
**Access:** Customer (Authenticated)

**Query Parameters:**
- `status` (optional): Filter by booking status

### 4.2 Create Booking
**Endpoint:** `POST /bookings`  
**Access:** Authenticated

**Request Body:**
```json
{
  "hotel_id": 1,
  "room_id": 5,
  "check_in": "2024-12-01",
  "check_out": "2024-12-05",
  "guests": 2,
  "special_requests": "غرفة عالية"
}
```

**Response:** `201 Created`
```json
{
  "message": "تم إنشاء الحجز بنجاح / Booking created successfully",
  "booking": {
    "id": 1,
    "hotel_id": 1,
    "room_id": 5,
    "check_in": "2024-12-01",
    "check_out": "2024-12-05",
    "total_nights": 4,
    "price_per_night": 150000,
    "total_price": 600000,
    "booking_status": "pending",
    "payment_status": "pending"
  }
}
```

### 4.3 Update Booking Status
**Endpoint:** `PUT /bookings/:id/status`  
**Access:** Staff (Authenticated)

**Request Body:**
```json
{
  "booking_status": "confirmed",
  "payment_status": "paid"
}
```

---

## 5. Payments

### 5.1 Get All Vouchers
**Endpoint:** `GET /payments/vouchers`  
**Access:** Accountant, Super Admin

**Query Parameters:**
- `voucher_type` (optional): receipt, payment, or disbursement
- `hotel_id` (optional): Filter by hotel
- `start_date` (optional): Start date
- `end_date` (optional): End date
- `page` (optional): Page number
- `limit` (optional): Items per page

### 5.2 Create Voucher
**Endpoint:** `POST /payments/vouchers`  
**Access:** Accountant, Super Admin

**Request Body:**
```json
{
  "voucher_type": "receipt",
  "hotel_id": 1,
  "amount": 500000,
  "payment_method": "نقدي",
  "payment_date": "2024-12-01",
  "beneficiary": "أحمد محمد",
  "description": "دفعة حجز",
  "reference_number": "REF123"
}
```

### 5.3 Get Payment Methods
**Endpoint:** `GET /payments/methods`  
**Access:** Authenticated

**Response:** `200 OK`
```json
{
  "payment_methods": [
    {
      "id": 1,
      "name_ar": "بنك بغداد",
      "name_en": "Bank of Baghdad",
      "method_type": "بنك",
      "icon": "fa-university",
      "account_numbers": [
        "IQ98RAFI123456789",
        "IQ98RAFI987654321"
      ],
      "status": "active"
    }
  ]
}
```

---

## 6. Service Requests

### 6.1 Get My Service Requests
**Endpoint:** `GET /services/my-requests`  
**Access:** Customer (Authenticated)

### 6.2 Create Service Request
**Endpoint:** `POST /services`  
**Access:** Customer (Authenticated)

**Request Body:**
```json
{
  "booking_id": 1,
  "hotel_id": 1,
  "request_type": "room_service",
  "description": "طلب وجبة عشاء",
  "items": [
    {
      "name": "برجر",
      "quantity": 2,
      "price": 25000
    }
  ],
  "priority": "normal"
}
```

### 6.3 Update Service Request Status
**Endpoint:** `PUT /services/:id/status`  
**Access:** Staff (Authenticated)

**Request Body:**
```json
{
  "status": "in_progress",
  "assigned_to": 5,
  "response": "جاري تحضير الطلب"
}
```

---

## 7. Reports

### 7.1 Dashboard Statistics
**Endpoint:** `GET /reports/dashboard`  
**Access:** Admin, Manager

**Query Parameters:**
- `hotel_id` (optional): Filter by hotel
- `start_date` (optional): Start date
- `end_date` (optional): End date

**Response:** `200 OK`
```json
{
  "hotels": 10,
  "bookings": 500,
  "revenue": {
    "total": 50000000,
    "pending": 5000000
  },
  "occupancy": {
    "available": 200,
    "occupied": 300,
    "total": 500,
    "rate": "60.00"
  },
  "maintenance": {
    "pending": 15,
    "completed": 100
  }
}
```

### 7.2 Bookings Report
**Endpoint:** `GET /reports/bookings`  
**Access:** Admin, Manager

### 7.3 Revenue Report
**Endpoint:** `GET /reports/revenue`  
**Access:** Admin, Accountant

### 7.4 Occupancy Report
**Endpoint:** `GET /reports/occupancy`  
**Access:** Admin, Manager

---

## 8. File Upload

### 8.1 Upload Single File
**Endpoint:** `POST /upload/single`  
**Access:** Authenticated  
**Content-Type:** `multipart/form-data`

**Form Data:**
- `file`: The file to upload
- `folder` (optional): Destination folder (default: 'general')

**Response:** `200 OK`
```json
{
  "message": "تم رفع الملف بنجاح / File uploaded successfully",
  "file": {
    "filename": "file-1234567890.jpg",
    "originalName": "photo.jpg",
    "size": 102400,
    "mimetype": "image/jpeg",
    "url": "/uploads/general/file-1234567890.jpg"
  }
}
```

### 8.2 Upload Multiple Files
**Endpoint:** `POST /upload/multiple`  
**Access:** Authenticated  
**Content-Type:** `multipart/form-data`

---

## Error Responses

### Validation Error (400)
```json
{
  "error": "خطأ في التحقق من البيانات / Validation error",
  "errors": [
    {
      "field": "email",
      "message": "البريد الإلكتروني غير صالح / Invalid email",
      "value": "invalid-email"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "error": "يرجى تسجيل الدخول مرة أخرى / Please login again"
}
```

### Forbidden (403)
```json
{
  "error": "ليس لديك صلاحية للوصول / You do not have permission to access this resource"
}
```

### Not Found (404)
```json
{
  "error": "الفندق غير موجود / Hotel not found"
}
```

### Rate Limit (429)
```json
{
  "error": "تم تجاوز عدد الطلبات المسموح به / Too many requests",
  "retryAfter": 600
}
```

### Server Error (500)
```json
{
  "error": "خطأ في الخادم / Server error"
}
```

---

## Rate Limiting
- **Window:** 15 minutes
- **Max Requests:** 100 per window

---

## Notes
1. All dates should be in `YYYY-MM-DD` format
2. Amounts are in Iraqi Dinar (IQD)
3. Phone numbers should be in Iraqi format: `07xxxxxxxxx`
4. All responses include Arabic and English text for better UX
5. File uploads are limited to 5MB for images, 10MB for documents

---

**Version:** 1.0.0  
**Last Updated:** November 2024  
**Support:** NineSoft Development Team
