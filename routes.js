const express = require('express');
const router = express.Router();
const FoodItem = require('./models/FoodItem');
const cors = require('cors');

router.use(cors());

router.get('/fooditems', async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    res.json(foodItems); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items', error });
  }
});


router.get('/fooditems/:name', async (req, res) => {
  const foodName = req.params.name;
  
  try {
    const foodItem = await FoodItem.findOne({ name: foodName });
    if (foodItem) {
      res.json(foodItem);
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the food item', error });
  }
});

module.exports = router;
