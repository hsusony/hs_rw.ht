# 🚀 دليل النشر - Hotel Management System Backend

## 📋 المتطلبات الأساسية

### البرامج المطلوبة
- **Node.js**: v16 أو أحدث
- **PostgreSQL**: v12 أو أحدث
- **npm**: يأتي مع Node.js
- **Git**: للتحكم بالإصدارات

## ⚙️ الإعداد المحلي (Development)

### 1. تثبيت قاعدة البيانات

```bash
# تشغيل PostgreSQL
# Windows: افتح pgAdmin أو استخدم services.msc
# Linux: sudo systemctl start postgresql
# macOS: brew services start postgresql

# إنشاء قاعدة البيانات
psql -U postgres
CREATE DATABASE hotel_management;
\q
```

### 2. تهيئة المشروع

```bash
# استنساخ المشروع
cd backend

# تثبيت الحزم
npm install

# نسخ ملف البيئة
copy .env.example .env

# تعديل ملف .env بالإعدادات الخاصة بك
notepad .env
```

### 3. تهيئة قاعدة البيانات

```bash
# إنشاء الجداول
npm run init-db

# إدراج البيانات التجريبية
npm run seed

# أو تنفيذ الأمرين معاً
npm run reset-db
```

### 4. تشغيل الخادم

```bash
# وضع التطوير (مع nodemon)
npm run dev

# وضع الإنتاج
npm start
```

## 🌐 النشر على الإنترنت

### خيار 1: النشر على Heroku

#### التحضير
```bash
# تثبيت Heroku CLI
# Windows: تحميل من https://devcenter.heroku.com/articles/heroku-cli

# تسجيل الدخول
heroku login

# إنشاء تطبيق جديد
heroku create your-hotel-app

# إضافة PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev
```

#### إضافة ملف Procfile
```bash
echo "web: node server.js" > Procfile
```

#### تهيئة المتغيرات
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secure_jwt_secret_here
heroku config:set CORS_ORIGIN=https://your-frontend-url.com
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER=your_email@gmail.com
heroku config:set SMTP_PASS=your_app_password
heroku config:set EMAIL_FROM=noreply@hotelmanagement.com
heroku config:set FRONTEND_URL=https://your-frontend-url.com
```

#### النشر
```bash
git add .
git commit -m "Prepare for deployment"
git push heroku main

# تشغيل سكريبت إنشاء الجداول
heroku run npm run init-db

# إدراج البيانات التجريبية (اختياري)
heroku run npm run seed
```

### خيار 2: النشر على Railway

#### التحضير
```bash
# تثبيت Railway CLI
npm i -g @railway/cli

# تسجيل الدخول
railway login

# ربط المشروع
railway init

# إضافة PostgreSQL
railway add
# اختر PostgreSQL من القائمة
```

#### تهيئة المتغيرات
```bash
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your_secure_jwt_secret_here
railway variables set CORS_ORIGIN=https://your-frontend-url.com
# أضف باقي المتغيرات...
```

#### النشر
```bash
railway up
```

### خيار 3: النشر على VPS (Ubuntu)

#### تثبيت Node.js و PostgreSQL
```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# تثبيت PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# تثبيت PM2 لإدارة التطبيق
sudo npm install -g pm2
```

#### إعداد قاعدة البيانات
```bash
# تسجيل الدخول إلى PostgreSQL
sudo -u postgres psql

# إنشاء مستخدم وقاعدة بيانات
CREATE USER hotel_admin WITH PASSWORD 'secure_password';
CREATE DATABASE hotel_management OWNER hotel_admin;
GRANT ALL PRIVILEGES ON DATABASE hotel_management TO hotel_admin;
\q
```

#### نقل المشروع
```bash
# على جهازك المحلي
scp -r backend user@your-server-ip:/home/user/

# على الخادم
cd /home/user/backend
npm install --production

# نسخ وتعديل ملف البيئة
cp .env.example .env
nano .env
```

#### تهيئة قاعدة البيانات
```bash
npm run init-db
npm run seed
```

#### تشغيل التطبيق بـ PM2
```bash
# تشغيل التطبيق
pm2 start server.js --name hotel-backend

# حفظ قائمة التطبيقات
pm2 save

# تفعيل التشغيل التلقائي عند الإقلاع
pm2 startup
```

#### إعداد Nginx كـ Reverse Proxy
```bash
# تثبيت Nginx
sudo apt install nginx -y

# إنشاء ملف التهيئة
sudo nano /etc/nginx/sites-available/hotel-backend

# أضف هذا المحتوى:
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# تفعيل الموقع
sudo ln -s /etc/nginx/sites-available/hotel-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### إعداد SSL بـ Let's Encrypt
```bash
# تثبيت Certbot
sudo apt install certbot python3-certbot-nginx -y

# الحصول على شهادة SSL
sudo certbot --nginx -d api.yourdomain.com

# تجديد تلقائي
sudo crontab -e
# أضف هذا السطر:
0 0 * * * certbot renew --quiet
```

## 🔐 الأمان في الإنتاج

### 1. متغيرات البيئة الهامة
```bash
# JWT Secret: يجب أن يكون طويل وعشوائي (32 حرف على الأقل)
JWT_SECRET=$(openssl rand -base64 32)

# Database Password: استخدم كلمة مرور قوية
DB_PASSWORD=$(openssl rand -base64 16)
```

### 2. Firewall على VPS
```bash
# السماح بالـ SSH و HTTP و HTTPS فقط
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. تحديثات الأمان
```bash
# تحديث الحزم بانتظام
sudo apt update && sudo apt upgrade -y

# تحديث حزم npm
npm audit fix
```

## 📊 المراقبة والصيانة

### PM2 Commands
```bash
# عرض حالة التطبيق
pm2 status

# عرض اللوغات
pm2 logs hotel-backend

# إعادة تشغيل
pm2 restart hotel-backend

# إيقاف
pm2 stop hotel-backend

# حذف
pm2 delete hotel-backend
```

### PostgreSQL Backup
```bash
# أخذ نسخة احتياطية
pg_dump -U hotel_admin hotel_management > backup_$(date +%Y%m%d).sql

# استعادة من نسخة احتياطية
psql -U hotel_admin hotel_management < backup_20240101.sql

# نسخة احتياطية تلقائية يومية
crontab -e
# أضف:
0 2 * * * pg_dump -U hotel_admin hotel_management > /backups/hotel_$(date +\%Y\%m\%d).sql
```

## 🔍 استكشاف الأخطاء

### مشكلة: لا يمكن الاتصال بقاعدة البيانات
```bash
# تحقق من تشغيل PostgreSQL
sudo systemctl status postgresql

# تحقق من صلاحيات المستخدم
sudo -u postgres psql -c "\du"

# تحقق من ملف pg_hba.conf
sudo nano /etc/postgresql/12/main/pg_hba.conf
```

### مشكلة: Port already in use
```bash
# ابحث عن العملية التي تستخدم المنفذ
lsof -i :5000

# أوقف العملية
kill -9 <PID>
```

### مشكلة: Memory Issues
```bash
# زيادة ذاكرة PM2
pm2 start server.js --name hotel-backend --max-memory-restart 500M
```

## 📱 إعداد الإيميل

### Gmail Setup
1. تفعيل "2-Step Verification" في حساب جوجل
2. إنشاء "App Password":
   - اذهب إلى: https://myaccount.google.com/apppasswords
   - اختر "Mail" و "Other"
   - انسخ الباسورد المكون من 16 خانة
3. استخدمه في SMTP_PASS

### SendGrid Setup (بديل أفضل)
```bash
# التسجيل على https://sendgrid.com
# الحصول على API Key

# تحديث .env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

## ✅ Checklist قبل النشر

- [ ] تم تغيير JWT_SECRET إلى قيمة آمنة
- [ ] تم تغيير كلمات مرور قاعدة البيانات
- [ ] NODE_ENV=production
- [ ] تم تهيئة CORS_ORIGIN بعنوان Frontend الصحيح
- [ ] تم إعداد البريد الإلكتروني (اختياري)
- [ ] تم اختبار جميع API endpoints
- [ ] تم إعداد SSL certificate
- [ ] تم إعداد Firewall
- [ ] تم إعداد النسخ الاحتياطية التلقائية
- [ ] تم إعداد المراقبة والـ logs

## 🔄 تحديث التطبيق

### على Heroku
```bash
git add .
git commit -m "Update"
git push heroku main
```

### على VPS
```bash
cd /home/user/backend
git pull origin main
npm install
pm2 restart hotel-backend
```

## 📞 الدعم والمساعدة

للمزيد من المساعدة أو الإبلاغ عن مشاكل، يرجى فتح issue على GitHub أو التواصل مع فريق التطوير.
