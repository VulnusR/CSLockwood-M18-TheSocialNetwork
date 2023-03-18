const mongoose = require('mongoose');

const { username, password } = require('./credentials');

mongoose.connect(`mongodb+srv://${username}:${password}@<dbname>.cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


//dsafadsf