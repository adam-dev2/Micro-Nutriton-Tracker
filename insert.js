const mongoose = require('mongoose');
const fs = require('fs');
const FoodItem = require('./models/FoodItem');


mongoose.connect('mongodb+srv://shaikadam642:PgHZU4iTiJtQlRgY@cluster0.wzj4d7w.mongodb.net/Nutri_Tracker', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const loadFoodData = () => {
  fs.readFile('./foodData.json', 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    const foodItems = JSON.parse(data);

    try {
      
      const existingItems = await FoodItem.find({ name: { $in: foodItems.map(item => item.name) } });
      const existingNames = new Set(existingItems.map(item => item.name));

      
      const newItems = foodItems.filter(item => !existingNames.has(item.name));

      
      if (newItems.length > 0) {
        await FoodItem.insertMany(newItems, { ordered: false });
        console.log('New food items inserted successfully.');
      } else {
        console.log('No new food items to insert.');
      }
    } catch (error) {
      console.error('Error inserting food items:', error);
    } finally {
      mongoose.connection.close(); 
    }
  });
};


loadFoodData();