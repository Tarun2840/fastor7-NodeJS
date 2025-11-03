const sequelize = require('../config/database');
const Employee = require('./employee');
const Enquiry = require('./enquiry');

// Define relationships
Enquiry.belongsTo(Employee, {
  foreignKey: 'counselorId',
  as: 'counselor',
});

Employee.hasMany(Enquiry, {
  foreignKey: 'counselorId',
  as: 'enquiries',
});

module.exports = {
  sequelize,
  Employee,
  Enquiry,
};
