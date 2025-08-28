const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  contactPerson: {
    type: String,
    required: [true, 'Please add a contact person'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be longer than 20 characters']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  performance: {
    type: String,
    enum: ['Excellent', 'Good', 'Average', 'Poor', 'On-time', 'Delayed'],
    default: 'Average'
  },
  productsSupplied: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  }],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);