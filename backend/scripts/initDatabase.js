const pool = require('../config/database');

const createTables = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        first_name_en VARCHAR(100),
        last_name_en VARCHAR(100),
        phone VARCHAR(50),
        role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'accountant', 'representative', 'hotel_manager', 'branch_manager', 'hotel_accountant', 'receptionist', 'housekeeping', 'maintenance', 'customer')),
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Hotels table
    await client.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255),
        category INTEGER CHECK (category BETWEEN 1 AND 5),
        main_group VARCHAR(100),
        sub_group VARCHAR(100),
        total_rooms INTEGER DEFAULT 0,
        total_floors INTEGER DEFAULT 0,
        governorate VARCHAR(100),
        area VARCHAR(100),
        address TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        description TEXT,
        amenities JSONB,
        images JSONB,
        rating DECIMAL(2,1) DEFAULT 0,
        trial_start_date DATE,
        trial_end_date DATE,
        is_trial BOOLEAN DEFAULT false,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Floors table
    await client.query(`
      CREATE TABLE IF NOT EXISTS floors (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        floor_number INTEGER NOT NULL,
        floor_name VARCHAR(100),
        floor_name_en VARCHAR(100),
        total_rooms INTEGER DEFAULT 0,
        description TEXT,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(hotel_id, floor_number)
      );
    `);

    // Room Types table
    await client.query(`
      CREATE TABLE IF NOT EXISTS room_types (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        type_name VARCHAR(100) NOT NULL,
        type_name_en VARCHAR(100),
        description TEXT,
        base_price DECIMAL(10,2) NOT NULL,
        max_guests INTEGER DEFAULT 1,
        amenities JSONB,
        images JSONB,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Halls table
    await client.query(`
      CREATE TABLE IF NOT EXISTS halls (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        hall_name VARCHAR(100) NOT NULL,
        hall_name_en VARCHAR(100),
        capacity INTEGER NOT NULL,
        price_per_hour DECIMAL(10,2),
        price_per_day DECIMAL(10,2),
        amenities JSONB,
        description TEXT,
        images JSONB,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Rooms table
    await client.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        floor_id INTEGER REFERENCES floors(id) ON DELETE SET NULL,
        room_type_id INTEGER REFERENCES room_types(id) ON DELETE SET NULL,
        hall_id INTEGER REFERENCES halls(id) ON DELETE SET NULL,
        room_number VARCHAR(20) NOT NULL,
        floor INTEGER NOT NULL,
        room_type VARCHAR(50) NOT NULL,
        price_per_night DECIMAL(10,2) NOT NULL,
        size INTEGER,
        beds INTEGER DEFAULT 1,
        capacity INTEGER DEFAULT 1,
        amenities JSONB,
        status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance', 'cleaning', 'reserved', 'unavailable')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(hotel_id, room_number)
      );
    `);

    // Customers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        customer_type VARCHAR(20) DEFAULT 'temporary' CHECK (customer_type IN ('temporary', 'permanent', 'corporate')),
        date_of_birth DATE,
        nationality VARCHAR(100),
        passport_number VARCHAR(100),
        id_number VARCHAR(100),
        address TEXT,
        city VARCHAR(100),
        country VARCHAR(100),
        preferences JSONB,
        loyalty_points INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Booking Apps table (external booking platforms)
    await client.query(`
      CREATE TABLE IF NOT EXISTS booking_apps (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        app_name VARCHAR(100) NOT NULL,
        app_name_en VARCHAR(100),
        commission_rate DECIMAL(5,2) NOT NULL,
        api_key VARCHAR(255),
        api_secret VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        total_bookings INTEGER DEFAULT 0,
        total_commission DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Bookings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        room_id INTEGER REFERENCES rooms(id) ON DELETE SET NULL,
        customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
        booking_app_id INTEGER REFERENCES booking_apps(id) ON DELETE SET NULL,
        booking_source VARCHAR(50) DEFAULT 'direct' CHECK (booking_source IN ('direct', 'phone', 'website', 'app', 'agent')),
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        guests INTEGER DEFAULT 1,
        total_nights INTEGER NOT NULL,
        price_per_night DECIMAL(10,2) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        booking_status VARCHAR(20) DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
        payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
        special_requests TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Subscriptions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        subscription_type VARCHAR(20) NOT NULL CHECK (subscription_type IN ('monthly', 'annual')),
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        trial_days INTEGER DEFAULT 0,
        discount_percentage DECIMAL(5,2) DEFAULT 0,
        base_price DECIMAL(10,2) NOT NULL,
        final_price DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'suspended')),
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Payments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        voucher_number VARCHAR(50) UNIQUE NOT NULL,
        voucher_type VARCHAR(20) NOT NULL CHECK (voucher_type IN ('receipt', 'payment', 'disbursement')),
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE SET NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        payment_date DATE NOT NULL,
        beneficiary VARCHAR(255),
        description TEXT,
        reference_number VARCHAR(100),
        status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled')),
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Payment Methods table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payment_methods (
        id SERIAL PRIMARY KEY,
        name_ar VARCHAR(100) NOT NULL,
        name_en VARCHAR(100) NOT NULL,
        method_type VARCHAR(50) NOT NULL,
        icon VARCHAR(50),
        account_numbers JSONB,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Agents table
    await client.query(`
      CREATE TABLE IF NOT EXISTS agents (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        commission_rate DECIMAL(5,2) NOT NULL,
        agent_type VARCHAR(50),
        area VARCHAR(100),
        total_hotels_added INTEGER DEFAULT 0,
        total_commission DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Housekeeping table
    await client.query(`
      CREATE TABLE IF NOT EXISTS housekeeping (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
        assigned_to INTEGER REFERENCES users(id),
        task_type VARCHAR(50) NOT NULL,
        priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'verified')),
        started_at TIMESTAMP,
        completed_at TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Maintenance table
    await client.query(`
      CREATE TABLE IF NOT EXISTS maintenance (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
        assigned_to INTEGER REFERENCES users(id),
        issue_type VARCHAR(50) NOT NULL,
        issue_description TEXT NOT NULL,
        priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
        status VARCHAR(20) DEFAULT 'reported' CHECK (status IN ('reported', 'assigned', 'in_progress', 'completed', 'verified')),
        reported_by INTEGER REFERENCES users(id),
        reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        started_at TIMESTAMP,
        completed_at TIMESTAMP,
        cost DECIMAL(10,2),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Service Requests table (room service, cleaning requests, complaints)
    await client.query(`
      CREATE TABLE IF NOT EXISTS service_requests (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
        customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        request_type VARCHAR(50) NOT NULL CHECK (request_type IN ('room_service', 'cleaning', 'complaint', 'maintenance')),
        description TEXT NOT NULL,
        items JSONB,
        priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
        assigned_to INTEGER REFERENCES users(id),
        total_amount DECIMAL(10,2) DEFAULT 0,
        images JSONB,
        response TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP
      );
    `);

    // Activity Logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50),
        entity_id INTEGER,
        details JSONB,
        ip_address VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Additional Services table
    await client.query(`
      CREATE TABLE IF NOT EXISTS additional_services (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        service_name VARCHAR(100) NOT NULL,
        service_name_en VARCHAR(100),
        service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('food', 'laundry', 'transport', 'spa', 'gym', 'other')),
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Expense Accounts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS expense_accounts (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        account_name VARCHAR(100) NOT NULL,
        account_name_en VARCHAR(100),
        account_type VARCHAR(50) NOT NULL CHECK (account_type IN ('salary', 'utilities', 'maintenance', 'supplies', 'marketing', 'other')),
        description TEXT,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Partners table
    await client.query(`
      CREATE TABLE IF NOT EXISTS partners (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        partner_name VARCHAR(255) NOT NULL,
        partner_name_en VARCHAR(255),
        partner_type VARCHAR(50) NOT NULL CHECK (partner_type IN ('supplier', 'agency', 'corporate', 'other')),
        contact_person VARCHAR(100),
        phone VARCHAR(50),
        email VARCHAR(255),
        address TEXT,
        commission_rate DECIMAL(5,2) DEFAULT 0,
        contract_start DATE,
        contract_end DATE,
        notes TEXT,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Permanent Customers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS permanent_customers (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
        discount_percentage DECIMAL(5,2) DEFAULT 0,
        special_services JSONB,
        contract_start DATE,
        contract_end DATE,
        notes TEXT,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(hotel_id, customer_id)
      );
    `);

    // Trial Periods table
    await client.query(`
      CREATE TABLE IF NOT EXISTS trial_periods (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        trial_days INTEGER NOT NULL,
        features_enabled JSONB,
        is_active BOOLEAN DEFAULT true,
        converted_to_paid BOOLEAN DEFAULT false,
        conversion_date DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // App Commissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS app_commissions (
        id SERIAL PRIMARY KEY,
        booking_app_id INTEGER REFERENCES booking_apps(id) ON DELETE CASCADE,
        booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
        commission_amount DECIMAL(10,2) NOT NULL,
        commission_rate DECIMAL(5,2) NOT NULL,
        booking_amount DECIMAL(10,2) NOT NULL,
        payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
        payment_date DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Warehouses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS warehouses (
        id SERIAL PRIMARY KEY,
        hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
        warehouse_name VARCHAR(100) NOT NULL,
        warehouse_name_en VARCHAR(100),
        location VARCHAR(255),
        manager_id INTEGER REFERENCES users(id),
        description TEXT,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Inventory Items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS inventory_items (
        id SERIAL PRIMARY KEY,
        warehouse_id INTEGER REFERENCES warehouses(id) ON DELETE CASCADE,
        item_name VARCHAR(100) NOT NULL,
        item_name_en VARCHAR(100),
        item_code VARCHAR(50) UNIQUE,
        category VARCHAR(50) NOT NULL CHECK (category IN ('food', 'beverage', 'cleaning', 'maintenance', 'linen', 'amenities', 'other')),
        unit VARCHAR(20) NOT NULL,
        quantity DECIMAL(10,2) DEFAULT 0,
        min_quantity DECIMAL(10,2) DEFAULT 0,
        max_quantity DECIMAL(10,2),
        unit_price DECIMAL(10,2) NOT NULL,
        total_value DECIMAL(10,2) DEFAULT 0,
        supplier VARCHAR(255),
        last_purchase_date DATE,
        expiry_date DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Stock Issues table (صرف المخزون)
    await client.query(`
      CREATE TABLE IF NOT EXISTS stock_issues (
        id SERIAL PRIMARY KEY,
        warehouse_id INTEGER REFERENCES warehouses(id) ON DELETE CASCADE,
        inventory_item_id INTEGER REFERENCES inventory_items(id) ON DELETE CASCADE,
        issue_number VARCHAR(50) UNIQUE NOT NULL,
        quantity DECIMAL(10,2) NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        total_value DECIMAL(10,2) NOT NULL,
        department VARCHAR(100),
        issued_to INTEGER REFERENCES users(id),
        issued_by INTEGER REFERENCES users(id),
        issue_date DATE NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Purchase Invoices table
    await client.query(`
      CREATE TABLE IF NOT EXISTS purchase_invoices (
        id SERIAL PRIMARY KEY,
        warehouse_id INTEGER REFERENCES warehouses(id) ON DELETE CASCADE,
        invoice_number VARCHAR(50) UNIQUE NOT NULL,
        supplier_name VARCHAR(255) NOT NULL,
        supplier_phone VARCHAR(50),
        invoice_date DATE NOT NULL,
        payment_method VARCHAR(50),
        subtotal DECIMAL(10,2) NOT NULL,
        tax_amount DECIMAL(10,2) DEFAULT 0,
        discount_amount DECIMAL(10,2) DEFAULT 0,
        total_amount DECIMAL(10,2) NOT NULL,
        payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid')),
        notes TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Purchase Invoice Items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS purchase_invoice_items (
        id SERIAL PRIMARY KEY,
        invoice_id INTEGER REFERENCES purchase_invoices(id) ON DELETE CASCADE,
        inventory_item_id INTEGER REFERENCES inventory_items(id) ON DELETE CASCADE,
        quantity DECIMAL(10,2) NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_hotels_status ON hotels(status);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_hotels_trial ON hotels(is_trial);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_rooms_hotel_id ON rooms(hotel_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_rooms_floor_id ON rooms(floor_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bookings_hotel_id ON bookings(hotel_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_payments_voucher_type ON payments(voucher_type);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_payments_hotel_id ON payments(hotel_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_service_requests_type ON service_requests(request_type);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_inventory_items_code ON inventory_items(item_code);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_inventory_items_warehouse ON inventory_items(warehouse_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_stock_issues_date ON stock_issues(issue_date);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_purchase_invoices_date ON purchase_invoices(invoice_date);');

    // Create function for updating timestamp
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create triggers for all tables with updated_at
    const tablesWithUpdatedAt = [
      'users', 'hotels', 'rooms', 'customers', 'bookings', 'subscriptions', 
      'payments', 'payment_methods', 'agents', 'housekeeping', 'maintenance', 
      'service_requests', 'floors', 'room_types', 'halls', 'additional_services',
      'expense_accounts', 'partners', 'permanent_customers', 'booking_apps',
      'trial_periods', 'app_commissions', 'warehouses', 'inventory_items',
      'stock_issues', 'purchase_invoices'
    ];

    for (const table of tablesWithUpdatedAt) {
      await client.query(`
        DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};
        CREATE TRIGGER update_${table}_updated_at
        BEFORE UPDATE ON ${table}
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
      `);
    }

    // Create function to update hotel total_rooms
    await client.query(`
      CREATE OR REPLACE FUNCTION update_hotel_total_rooms()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE hotels SET total_rooms = total_rooms + 1 WHERE id = NEW.hotel_id;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE hotels SET total_rooms = total_rooms - 1 WHERE id = OLD.hotel_id;
        ELSIF TG_OP = 'UPDATE' AND NEW.hotel_id != OLD.hotel_id THEN
          UPDATE hotels SET total_rooms = total_rooms - 1 WHERE id = OLD.hotel_id;
          UPDATE hotels SET total_rooms = total_rooms + 1 WHERE id = NEW.hotel_id;
        END IF;
        RETURN NULL;
      END;
      $$ language 'plpgsql';
    `);

    // Create trigger for rooms to update hotel total_rooms
    await client.query(`
      DROP TRIGGER IF EXISTS update_hotel_rooms_count ON rooms;
      CREATE TRIGGER update_hotel_rooms_count
      AFTER INSERT OR UPDATE OR DELETE ON rooms
      FOR EACH ROW
      EXECUTE FUNCTION update_hotel_total_rooms();
    `);

    // Create function to update inventory total_value
    await client.query(`
      CREATE OR REPLACE FUNCTION update_inventory_total_value()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.total_value = NEW.quantity * NEW.unit_price;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create trigger for inventory_items
    await client.query(`
      DROP TRIGGER IF EXISTS update_inventory_value ON inventory_items;
      CREATE TRIGGER update_inventory_value
      BEFORE INSERT OR UPDATE ON inventory_items
      FOR EACH ROW
      EXECUTE FUNCTION update_inventory_total_value();
    `);

    // Create function to update inventory quantity on stock issue
    await client.query(`
      CREATE OR REPLACE FUNCTION update_inventory_on_issue()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE inventory_items 
        SET quantity = quantity - NEW.quantity
        WHERE id = NEW.inventory_item_id;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create trigger for stock_issues
    await client.query(`
      DROP TRIGGER IF EXISTS update_inventory_after_issue ON stock_issues;
      CREATE TRIGGER update_inventory_after_issue
      AFTER INSERT ON stock_issues
      FOR EACH ROW
      EXECUTE FUNCTION update_inventory_on_issue();
    `);

    await client.query('COMMIT');
    console.log('✅ Database tables created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Run initialization
createTables()
  .then(() => {
    console.log('✅ Database initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  });
