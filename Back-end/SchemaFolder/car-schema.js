const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  color: String,
  pricePerDay: Number,
  available: Boolean,
  photoUrl: String, // Add a field to store the photo URL
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
