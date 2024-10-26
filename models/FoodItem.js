const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nutrients: {
    Protein: { type: String, default: '-' },
    'Vitamin D': { type: String, default: '-' },
    Calcium: { type: String, default: '-' },
    Iron: { type: String, default: '-' },
    Potassium: { type: String, default: '-' },
    'Vitamin A': { type: String, default: '-' },
    'Vitamin C': { type: String, default: '-' },
  }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
module.exports = FoodItem;
