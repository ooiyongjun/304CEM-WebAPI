const mongoose = require('mongoose');
const db = 'mongodb+srv://Eugene:database123@cluster0.1pmaz.mongodb.net/Nasa?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connection error: ', error);
  });

const schema = mongoose.Schema({
  image: { type: String },
  title: { type: String },
  date: { type: String },
  explanation: { type: String },

});

const Nasa = mongoose.model('Nasa', schema, 'stars');

module.exports = Nasa;
