const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'studyBoard'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  categories: [
    { category: String,
      topics: [
        { 
          topic: String,
          answer: String,
          done: Boolean
        }
      ]
    }
  ]
});

const User = mongoose.model('user', userSchema);

module.exports = User;