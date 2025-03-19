const mongoose = require('mongoose');

const connect_db = async () => {
  try {
    const url = `mongodb://localhost:27017`; // Use IPv4 and specify the database name
    await mongoose.connect(url, {
      useNewUrlParser: true, // Use the new MongoDB connection string parser mongodb://localhost:27017/
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    });
    console.log('Successfully connected with db');
  } catch (err) {
    console.error('Error while connecting to db:', err);
  }
};

module.exports = connect_db;
