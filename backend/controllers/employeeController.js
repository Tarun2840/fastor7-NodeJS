const jwt = require('jsonwebtoken');
const { Employee } = require('../models');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new employee
// @route   POST /api/employees/register
// @access  Public
const registerEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if employee exists
    const employeeExists = await Employee.findOne({ where: { email } });

    if (employeeExists) {
      return res.status(400).json({ message: 'Employee already exists with this email' });
    }

    // Create employee (password will be hashed by model hook)
    const employee = await Employee.create({
      name,
      email,
      password,
    });

    if (employee) {
      res.status(201).json({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        token: generateToken(employee.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid employee data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Login employee
// @route   POST /api/employees/login
// @access  Public
const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find employee
    const employee = await Employee.findOne({ where: { email } });

    if (employee && (await employee.comparePassword(password))) {
      res.json({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        token: generateToken(employee.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get employee profile
// @route   GET /api/employees/profile
// @access  Private
const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.user, {
      attributes: { exclude: ['password'] },
    });

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
  getEmployeeProfile,
};
