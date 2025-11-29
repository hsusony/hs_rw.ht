// Email configuration and sending utilities
const nodemailer = require('nodemailer');

// Create transporter (configure based on your email service)
const createTransporter = () => {
  // For development, you can use a test account
  // For production, use your actual SMTP settings
  
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // For development, log emails to console
    return {
      sendMail: async (mailOptions) => {
        console.log('📧 Email would be sent:', mailOptions);
        return { messageId: 'dev-' + Date.now() };
      }
    };
  }
};

// Send booking confirmation email
const sendBookingConfirmation = async (booking, customer, hotel) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@hotelmanagement.com',
    to: customer.email,
    subject: `تأكيد الحجز / Booking Confirmation - ${booking.id}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>تأكيد حجز فندق</h2>
        <p>عزيزي ${customer.first_name} ${customer.last_name},</p>
        <p>تم تأكيد حجزك في ${hotel.name}</p>
        
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
          <h3>تفاصيل الحجز:</h3>
          <p><strong>رقم الحجز:</strong> ${booking.id}</p>
          <p><strong>تاريخ الوصول:</strong> ${booking.check_in}</p>
          <p><strong>تاريخ المغادرة:</strong> ${booking.check_out}</p>
          <p><strong>عدد الليالي:</strong> ${booking.total_nights}</p>
          <p><strong>المبلغ الإجمالي:</strong> ${booking.total_price} IQD</p>
        </div>
        
        <p>نتطلع لاستضافتك!</p>
        <p>مع تحياتنا،<br>فريق ${hotel.name}</p>
        
        <hr style="margin: 30px 0;">
        
        <div dir="ltr">
          <h2>Hotel Booking Confirmation</h2>
          <p>Dear ${customer.first_name_en || customer.first_name} ${customer.last_name_en || customer.last_name},</p>
          <p>Your booking at ${hotel.name_en || hotel.name} has been confirmed.</p>
          
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Check-in:</strong> ${booking.check_in}</p>
            <p><strong>Check-out:</strong> ${booking.check_out}</p>
            <p><strong>Nights:</strong> ${booking.total_nights}</p>
            <p><strong>Total Amount:</strong> ${booking.total_price} IQD</p>
          </div>
          
          <p>We look forward to hosting you!</p>
          <p>Best regards,<br>${hotel.name_en || hotel.name} Team</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
  const transporter = createTransporter();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@hotelmanagement.com',
    to: user.email,
    subject: 'إعادة تعيين كلمة المرور / Password Reset',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>إعادة تعيين كلمة المرور</h2>
        <p>مرحباً ${user.first_name},</p>
        <p>تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بك.</p>
        <p>انقر على الرابط أدناه لإعادة تعيين كلمة المرور:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          إعادة تعيين كلمة المرور
        </a>
        <p>هذا الرابط صالح لمدة ساعة واحدة فقط.</p>
        <p>إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد.</p>
        
        <hr style="margin: 30px 0;">
        
        <div dir="ltr">
          <h2>Password Reset</h2>
          <p>Hello ${user.first_name_en || user.first_name},</p>
          <p>We received a request to reset your password.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Reset Password
          </a>
          <p>This link is valid for 1 hour only.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@hotelmanagement.com',
    to: user.email,
    subject: 'مرحباً بك / Welcome to Hotel Management System',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>مرحباً بك في نظام إدارة الفنادق</h2>
        <p>عزيزي ${user.first_name} ${user.last_name},</p>
        <p>نرحب بك في نظام إدارة الفنادق!</p>
        <p>تم إنشاء حسابك بنجاح ويمكنك الآن:</p>
        <ul>
          <li>تصفح الفنادق المتاحة</li>
          <li>حجز الغرف</li>
          <li>إدارة حجوزاتك</li>
          <li>طلب الخدمات</li>
          <li>كسب نقاط الولاء</li>
        </ul>
        <p>نتمنى لك تجربة رائعة!</p>
        
        <hr style="margin: 30px 0;">
        
        <div dir="ltr">
          <h2>Welcome to Hotel Management System</h2>
          <p>Dear ${user.first_name_en || user.first_name} ${user.last_name_en || user.last_name},</p>
          <p>Welcome to Hotel Management System!</p>
          <p>Your account has been created successfully. You can now:</p>
          <ul>
            <li>Browse available hotels</li>
            <li>Book rooms</li>
            <li>Manage your bookings</li>
            <li>Request services</li>
            <li>Earn loyalty points</li>
          </ul>
          <p>We wish you a great experience!</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw error for welcome emails
    return null;
  }
};

module.exports = {
  sendBookingConfirmation,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
