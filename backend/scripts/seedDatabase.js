const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    console.log('🌱 Starting database seeding...');

    // Check if data already exists
    const usersCount = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(usersCount.rows[0].count) > 0) {
      console.log('⚠️  Database already has data. Skipping seed...');
      await client.query('ROLLBACK');
      return;
    }

    // 1. Create Super Admin
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const superAdmin = await client.query(
      `INSERT INTO users (email, password, first_name, last_name, first_name_en, last_name_en, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'super_admin', 'active')
       RETURNING id`,
      ['admin@hotelmanagement.com', hashedPassword, 'مدير', 'النظام', 'System', 'Admin', '07701234567']
    );
    console.log('✅ Super Admin created');

    // 2. Create Accountant
    await client.query(
      `INSERT INTO users (email, password, first_name, last_name, first_name_en, last_name_en, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'accountant', 'active')`,
      ['accountant@hotelmanagement.com', hashedPassword, 'محاسب', 'عام', 'General', 'Accountant', '07701234568']
    );
    console.log('✅ Accountant created');

    // 3. Create Hotel Manager
    const hotelManager = await client.query(
      `INSERT INTO users (email, password, first_name, last_name, first_name_en, last_name_en, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'hotel_manager', 'active')
       RETURNING id`,
      ['manager@hotelmanagement.com', hashedPassword, 'مدير', 'الفندق', 'Hotel', 'Manager', '07701234569']
    );
    console.log('✅ Hotel Manager created');

    // 4. Create Receptionist
    await client.query(
      `INSERT INTO users (email, password, first_name, last_name, first_name_en, last_name_en, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'receptionist', 'active')`,
      ['receptionist@hotelmanagement.com', hashedPassword, 'موظف', 'الاستقبال', 'Reception', 'Staff', '07701234570']
    );
    console.log('✅ Receptionist created');

    // 5. Create Sample Customer
    const customer = await client.query(
      `INSERT INTO users (email, password, first_name, last_name, first_name_en, last_name_en, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'customer', 'active')
       RETURNING id`,
      ['customer@example.com', hashedPassword, 'أحمد', 'محمد', 'Ahmed', 'Mohammed', '07701234571']
    );
    
    await client.query(
      'INSERT INTO customers (user_id, loyalty_points) VALUES ($1, 100)',
      [customer.rows[0].id]
    );
    console.log('✅ Sample Customer created');

    // 6. Create Sample Hotel
    const hotel = await client.query(
      `INSERT INTO hotels (
        name, name_en, category, total_rooms, total_floors,
        governorate, area, address, phone, email,
        description, amenities, rating, created_by, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'active')
      RETURNING id`,
      [
        'فندق بغداد الكبير',
        'Grand Baghdad Hotel',
        5,
        100,
        10,
        'بغداد',
        'الكرادة',
        'شارع الكرادة الرئيسي',
        '07701111111',
        'info@grandbaghdad.com',
        'فندق فاخر من فئة 5 نجوم في قلب بغداد',
        JSON.stringify(['wifi', 'pool', 'gym', 'spa', 'restaurant', 'parking']),
        4.5,
        hotelManager.rows[0].id
      ]
    );
    console.log('✅ Sample Hotel created');

    // 7. Create Sample Rooms
    const roomTypes = [
      { type: 'single', price: 100000, beds: 1, capacity: 1 },
      { type: 'double', price: 150000, beds: 2, capacity: 2 },
      { type: 'suite', price: 250000, beds: 2, capacity: 4 },
      { type: 'deluxe', price: 300000, beds: 2, capacity: 4 }
    ];

    for (let floor = 1; floor <= 5; floor++) {
      for (let room = 1; room <= 4; room++) {
        const roomType = roomTypes[(floor + room) % roomTypes.length];
        const roomNumber = `${floor}${room.toString().padStart(2, '0')}`;
        
        await client.query(
          `INSERT INTO rooms (
            hotel_id, room_number, floor, room_type, price_per_night,
            size, beds, capacity, amenities, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'available')`,
          [
            hotel.rows[0].id,
            roomNumber,
            floor,
            roomType.type,
            roomType.price,
            35,
            roomType.beds,
            roomType.capacity,
            JSON.stringify(['tv', 'minibar', 'ac', 'wifi'])
          ]
        );
      }
    }
    console.log('✅ Sample Rooms created (20 rooms)');

    // 8. Create Floors
    for (let floor = 1; floor <= 5; floor++) {
      await client.query(
        `INSERT INTO floors (hotel_id, floor_number, floor_name, floor_name_en, total_rooms, status)
         VALUES ($1, $2, $3, $4, 4, 'active')`,
        [hotel.rows[0].id, floor, `الطابق ${floor}`, `Floor ${floor}`]
      );
    }
    console.log('✅ Floors created (5 floors)');

    // 9. Create Room Types
    const roomTypeData = [
      { name: 'غرفة مفردة', name_en: 'Single Room', price: 100000, guests: 1 },
      { name: 'غرفة مزدوجة', name_en: 'Double Room', price: 150000, guests: 2 },
      { name: 'جناح', name_en: 'Suite', price: 250000, guests: 4 },
      { name: 'جناح فاخر', name_en: 'Deluxe Suite', price: 350000, guests: 6 }
    ];

    for (const roomType of roomTypeData) {
      await client.query(
        `INSERT INTO room_types (hotel_id, type_name, type_name_en, base_price, max_guests, status)
         VALUES ($1, $2, $3, $4, $5, 'active')`,
        [hotel.rows[0].id, roomType.name, roomType.name_en, roomType.price, roomType.guests]
      );
    }
    console.log('✅ Room Types created');

    // 10. Create Halls
    await client.query(
      `INSERT INTO halls (hotel_id, hall_name, hall_name_en, capacity, price_per_hour, price_per_day, status)
       VALUES 
       ($1, 'قاعة الاحتفالات الكبرى', 'Grand Ballroom', 500, 500000, 5000000, 'active'),
       ($1, 'قاعة الاجتماعات', 'Conference Room', 100, 200000, 1500000, 'active'),
       ($1, 'قاعة VIP', 'VIP Hall', 50, 300000, 2000000, 'active')`,
      [hotel.rows[0].id]
    );
    console.log('✅ Halls created');

    // 11. Create Additional Services
    const services = [
      { name: 'إفطار', name_en: 'Breakfast', type: 'food', price: 15000 },
      { name: 'غداء', name_en: 'Lunch', type: 'food', price: 30000 },
      { name: 'عشاء', name_en: 'Dinner', type: 'food', price: 30000 },
      { name: 'غسيل ملابس', name_en: 'Laundry', type: 'laundry', price: 10000 },
      { name: 'نقل من المطار', name_en: 'Airport Transfer', type: 'transport', price: 50000 },
      { name: 'سبا ومساج', name_en: 'Spa & Massage', type: 'spa', price: 80000 }
    ];

    for (const service of services) {
      await client.query(
        `INSERT INTO additional_services (hotel_id, service_name, service_name_en, service_type, price, status)
         VALUES ($1, $2, $3, $4, $5, 'active')`,
        [hotel.rows[0].id, service.name, service.name_en, service.type, service.price]
      );
    }
    console.log('✅ Additional Services created');

    // 12. Create Expense Accounts
    const expenseAccounts = [
      { name: 'رواتب الموظفين', name_en: 'Employee Salaries', type: 'salary' },
      { name: 'الكهرباء والماء', name_en: 'Utilities', type: 'utilities' },
      { name: 'الصيانة', name_en: 'Maintenance', type: 'maintenance' },
      { name: 'مواد التنظيف', name_en: 'Cleaning Supplies', type: 'supplies' },
      { name: 'التسويق والإعلان', name_en: 'Marketing', type: 'marketing' }
    ];

    for (const account of expenseAccounts) {
      await client.query(
        `INSERT INTO expense_accounts (hotel_id, account_name, account_name_en, account_type, status)
         VALUES ($1, $2, $3, $4, 'active')`,
        [hotel.rows[0].id, account.name, account.name_en, account.type]
      );
    }
    console.log('✅ Expense Accounts created');

    // 13. Create Warehouse
    const warehouse = await client.query(
      `INSERT INTO warehouses (hotel_id, warehouse_name, warehouse_name_en, location, status)
       VALUES ($1, 'المخزن الرئيسي', 'Main Warehouse', 'الطابق الأرضي', 'active')
       RETURNING id`,
      [hotel.rows[0].id]
    );
    console.log('✅ Warehouse created');

    // 14. Create Inventory Items
    const inventoryItems = [
      { name: 'منشفات', name_en: 'Towels', code: 'TWL001', category: 'linen', unit: 'قطعة', qty: 500, price: 5000 },
      { name: 'شامبو', name_en: 'Shampoo', code: 'SHP001', category: 'amenities', unit: 'قنينة', qty: 200, price: 3000 },
      { name: 'صابون', name_en: 'Soap', code: 'SOP001', category: 'amenities', unit: 'قطعة', qty: 1000, price: 1000 },
      { name: 'مواد تنظيف', name_en: 'Cleaning Supplies', code: 'CLN001', category: 'cleaning', unit: 'علبة', qty: 100, price: 15000 },
      { name: 'أرز', name_en: 'Rice', code: 'RIC001', category: 'food', unit: 'كغم', qty: 500, price: 2000 }
    ];

    for (const item of inventoryItems) {
      await client.query(
        `INSERT INTO inventory_items (warehouse_id, item_name, item_name_en, item_code, category, unit, quantity, min_quantity, unit_price)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 50, $8)`,
        [warehouse.rows[0].id, item.name, item.name_en, item.code, item.category, item.unit, item.qty, item.price]
      );
    }
    console.log('✅ Inventory Items created');

    // 15. Create Booking Apps
    const bookingApps = [
      { name: 'بوكينج دوت كوم', name_en: 'Booking.com', commission: 15 },
      { name: 'إكسبيديا', name_en: 'Expedia', commission: 18 },
      { name: 'أجودا', name_en: 'Agoda', commission: 16 }
    ];

    for (const app of bookingApps) {
      await client.query(
        `INSERT INTO booking_apps (hotel_id, app_name, app_name_en, commission_rate, is_active)
         VALUES ($1, $2, $3, $4, true)`,
        [hotel.rows[0].id, app.name, app.name_en, app.commission]
      );
    }
    console.log('✅ Booking Apps created');

    // 16. Create Partner
    await client.query(
      `INSERT INTO partners (hotel_id, partner_name, partner_name_en, partner_type, contact_person, phone, email, commission_rate, status)
       VALUES ($1, 'شركة السفر العالمية', 'Global Travel Agency', 'agency', 'محمد علي', '07701111222', 'info@globaltravel.com', 10, 'active')`,
      [hotel.rows[0].id]
    );
    console.log('✅ Partner created');

    // 8. Create Payment Methods
    const paymentMethods = [
      {
        name_ar: 'نقدي',
        name_en: 'Cash',
        type: 'نقد',
        icon: 'fa-money-bill',
        accounts: []
      },
      {
        name_ar: 'بنك بغداد',
        name_en: 'Bank of Baghdad',
        type: 'بنك',
        icon: 'fa-university',
        accounts: ['IQ98RAFI123456789', 'IQ98RAFI987654321']
      },
      {
        name_ar: 'التجاري العراقي',
        name_en: 'Iraqi Commercial Bank',
        type: 'بنك',
        icon: 'fa-university',
        accounts: ['IQ98TCIB111222333']
      },
      {
        name_ar: 'زين كاش',
        name_en: 'ZainCash',
        type: 'محفظة إلكترونية',
        icon: 'fa-mobile-alt',
        accounts: ['07701234567']
      }
    ];

    for (const method of paymentMethods) {
      await client.query(
        `INSERT INTO payment_methods (name_ar, name_en, method_type, icon, account_numbers, status)
         VALUES ($1, $2, $3, $4, $5, 'active')`,
        [method.name_ar, method.name_en, method.type, method.icon, JSON.stringify(method.accounts)]
      );
    }
    console.log('✅ Payment Methods created');

    // 17. Create Sample Subscription
    const today = new Date();
    const endDate = new Date(today);
    endDate.setFullYear(endDate.getFullYear() + 1);

    await client.query(
      `INSERT INTO subscriptions (
        hotel_id, subscription_type, start_date, end_date,
        trial_days, discount_percentage, base_price, final_price,
        status, created_by
      ) VALUES ($1, 'annual', $2, $3, 7, 10, 5000000, 4500000, 'active', $4)`,
      [hotel.rows[0].id, today, endDate, superAdmin.rows[0].id]
    );
    console.log('✅ Sample Subscription created');

    // 18. Create Trial Period
    const trialStart = new Date();
    const trialEnd = new Date(trialStart);
    trialEnd.setDate(trialEnd.getDate() + 7);

    await client.query(
      `INSERT INTO trial_periods (hotel_id, start_date, end_date, trial_days, is_active)
       VALUES ($1, $2, $3, 7, false)`,
      [hotel.rows[0].id, trialStart, trialEnd]
    );
    console.log('✅ Trial Period created');

    // 19. Create Sample Agent
    const agent = await client.query(
      `INSERT INTO users (email, password, first_name, last_name, phone, role, status)
       VALUES ($1, $2, $3, $4, $5, 'representative', 'active')
       RETURNING id`,
      ['agent@hotelmanagement.com', hashedPassword, 'مندوب', 'المبيعات', '07701234572']
    );

    await client.query(
      `INSERT INTO agents (user_id, commission_rate, agent_type, area, total_hotels_added, total_commission)
       VALUES ($1, 10, 'sales', 'بغداد', 1, 0)`,
      [agent.rows[0].id]
    );
    console.log('✅ Sample Agent created');

    await client.query('COMMIT');
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Default Accounts Created:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Super Admin:');
    console.log('  Email: admin@hotelmanagement.com');
    console.log('  Password: Admin@123');
    console.log('\nAccountant:');
    console.log('  Email: accountant@hotelmanagement.com');
    console.log('  Password: Admin@123');
    console.log('\nHotel Manager:');
    console.log('  Email: manager@hotelmanagement.com');
    console.log('  Password: Admin@123');
    console.log('\nReceptionist:');
    console.log('  Email: receptionist@hotelmanagement.com');
    console.log('  Password: Admin@123');
    console.log('\nSample Customer:');
    console.log('  Email: customer@example.com');
    console.log('  Password: Admin@123');
    console.log('\nAgent:');
    console.log('  Email: agent@hotelmanagement.com');
    console.log('  Password: Admin@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Run seeding
seedDatabase()
  .then(() => {
    console.log('✅ Seeding process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding process failed:', error);
    process.exit(1);
  });
