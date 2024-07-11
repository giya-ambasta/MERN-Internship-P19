// Imports
require('module-alias/register');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const app = require('./app.js');
require('dotenv').config();

// Database connection
mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('Connected to DB!')
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

glob.sync('./models/**/*.js').forEach(function (file) {
    require(path.resolve(file));
});

// Starting the app 
app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running on PORT : ${server.address().port}`);
});
  