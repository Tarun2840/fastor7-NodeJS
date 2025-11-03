const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getUnclaimedLeads,
  getClaimedLeads,
  claimLead,
} = require('../controllers/enquiryController');
const protect = require('../middlewares/auth');

// Public route - no authentication required
router.post('/public', submitEnquiry);

// Protected routes - authentication required
router.get('/public', protect, getUnclaimedLeads);
router.get('/private', protect, getClaimedLeads);
router.patch('/:id/claim', protect, claimLead);

module.exports = router;
