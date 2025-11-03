const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enquiry = sequelize.define('Enquiry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  courseInterest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  claimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  counselorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Employees',
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

module.exports = Enquiry;
