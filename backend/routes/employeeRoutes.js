const express = require('express');
const router = express.Router();
const {
  registerEmployee,
  loginEmployee,
  getEmployeeProfile,
} = require('../controllers/employeeController');
const protect = require('../middlewares/auth');

router.post('/register', registerEmployee);
router.post('/login', loginEmployee);
router.get('/profile', protect, getEmployeeProfile);

module.exports = router;
