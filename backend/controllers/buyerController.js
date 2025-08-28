const Buyer = require('../models/Buyer');

// @desc    Get all buyers
// @route   GET /api/buyers
// @access  Private
exports.getBuyers = async (req, res, next) => {
  try {
    const buyers = await Buyer.find({ isActive: true }).sort({ company: 1 });

    res.status(200).json({
      success: true,
      count: buyers.length,
      data: buyers
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single buyer
// @route   GET /api/buyers/:id
// @access  Private
exports.getBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findById(req.params.id);

    if (!buyer || !buyer.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: buyer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new buyer
// @route   POST /api/buyers
// @access  Private
exports.createBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.create(req.body);

    res.status(201).json({
      success: true,
      data: buyer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update buyer
// @route   PUT /api/buyers/:id
// @access  Private
exports.updateBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!buyer || !buyer.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: buyer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete buyer
// @route   DELETE /api/buyers/:id
// @access  Private
exports.deleteBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findById(req.params.id);

    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }

    // Soft delete by setting isActive to false
    buyer.isActive = false;
    await buyer.save();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};