const Supplier = require('../models/Supplier');

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private
exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({ isActive: true }).sort({ company: 1 });

    res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single supplier
// @route   GET /api/suppliers/:id
// @access  Private
exports.getSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate('productsSupplied');

    if (!supplier || !supplier.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    res.status(200).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new supplier
// @route   POST /api/suppliers
// @access  Private
exports.createSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.create(req.body);

    res.status(201).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update supplier
// @route   PUT /api/suppliers/:id
// @access  Private
exports.updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!supplier || !supplier.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    res.status(200).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete supplier
// @route   DELETE /api/suppliers/:id
// @access  Private
exports.deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    // Soft delete by setting isActive to false
    supplier.isActive = false;
    await supplier.save();

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