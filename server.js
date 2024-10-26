const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();

mongoose.connect('mongodb+srv://shaikadam642:PgHZU4iTiJtQlRgY@cluster0.wzj4d7w.mongodb.net/Nutri_Tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api', routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
