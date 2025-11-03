const { Enquiry, Employee } = require('../models');

// @desc    Submit public enquiry form
// @route   POST /api/enquiries/public
// @access  Public
const submitEnquiry = async (req, res) => {
  try {
    const { name, email, courseInterest, phone } = req.body;

    // Validation
    if (!name || !email || !courseInterest) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create enquiry
    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest,
      phone,
      claimed: false,
      counselorId: null,
    });

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get unclaimed leads (Public Enquiries)
// @route   GET /api/enquiries/public
// @access  Private
const getUnclaimedLeads = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      where: { claimed: false },
      order: [['createdAt', 'DESC']],
    });

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get leads claimed by logged-in user (Private Enquiries)
// @route   GET /api/enquiries/private
// @access  Private
const getClaimedLeads = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      where: {
        counselorId: req.user,
        claimed: true,
      },
      order: [['createdAt', 'DESC']],
    });

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Claim a lead
// @route   PATCH /api/enquiries/:id/claim
// @access  Private
const claimLead = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const counselorId = req.user;

    // Find enquiry
    const enquiry = await Enquiry.findByPk(enquiryId);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    // CRITICAL BUSINESS LOGIC CHECK
    if (enquiry.claimed === true) {
      return res.status(409).json({ message: 'This lead has already been claimed by another counselor' });
    }

    // Update enquiry
    enquiry.claimed = true;
    enquiry.counselorId = counselorId;
    await enquiry.save();

    // Get counselor details
    const counselor = await Employee.findByPk(counselorId, {
      attributes: { exclude: ['password'] },
    });

    res.json({
      message: 'Lead claimed successfully',
      enquiry: {
        ...enquiry.toJSON(),
        counselor,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitEnquiry,
  getUnclaimedLeads,
  getClaimedLeads,
  claimLead,
};
