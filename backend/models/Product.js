const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Stationery', 'Electronics', 'Pantry', 'Janitorial', 'Office Furniture', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  cost: {
    type: Number,
    min: [0, 'Cost cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  minStockLevel: {
    type: Number,
    min: [0, 'Minimum stock level cannot be negative'],
    default: 10
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier'
  },
  image: {
    type: String,
    default: 'no-image.jpg'
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'Out of Stock'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Update status based on quantity
productSchema.pre('save', function(next) {
  if (this.quantity > this.minStockLevel) {
    this.status = 'In Stock';
  } else if (this.quantity > 0 && this.quantity <= this.minStockLevel) {
    this.status = 'Low Stock';
  } else {
    this.status = 'Out of Stock';
  }
  next();
});

// Generate SKU before saving if not provided
productSchema.pre('save', async function(next) {
  if (!this.sku) {
    const categoryCode = this.category.substring(0, 3).toUpperCase();
    const count = await this.constructor.countDocuments();
    this.sku = `${categoryCode}-${(count + 1).toString().padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);