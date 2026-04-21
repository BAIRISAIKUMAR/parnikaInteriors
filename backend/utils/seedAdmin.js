const User = require('../models/User');

// Creates the default admin user from env variables if not already present
const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('⚠️  ADMIN_EMAIL or ADMIN_PASSWORD not set in .env — skipping admin seed.');
      return;
    }

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('✅ Admin user already exists.');
      return;
    }

    // Password is hashed automatically by the User model pre-save hook
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    console.log(`✅ Default admin created: ${adminEmail}`);
  } catch (err) {
    console.error('❌ Admin seed error:', err.message);
  }
};

module.exports = seedAdmin;
