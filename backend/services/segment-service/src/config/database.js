const { Sequelize } = require('sequelize');
require('dotenv').config();

// Support both SQLite (local dev) and PostgreSQL (production)
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' 
          ? { require: true, rejectUnauthorized: false }
          : false
      },
      logging: false
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false
    });

sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Unable to connect to database:', err));

module.exports = sequelize;