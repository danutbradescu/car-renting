const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  color: String,
  pricePerDay: Number,
  available: Boolean,
  photoUrl: String, 
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
