const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/Miniproject`);

const userSchema = mongoose.Schema({

  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: Number,
  password: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post'
    }
  ]

});


module.exports = mongoose.model('user', userSchema);



