const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  title: String,
  videoUrl: String,
});

const Data = mongoose.model('Data', dataSchema);

app.get('http://localhost:5000/api/data', (req, res) => {
  Data.findOne({}, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    if (!data) {
      return res.status(404).send('Data not found');
    }
    res.json(data);
  });
});

app.get('http://localhost:5000/api/data/:userId', (req, res) => {
  const userId = req.params.userId;

  Data.findOne({ userId }, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    if (!data) {
      return res.status(404).send('Data not found');
    }
    res.json(data);
  });
});




