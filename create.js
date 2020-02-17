// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./shcema');

connect(); // To the database

// Create some faculty
const harcourt = new Voter({
  firstName: 'Ed Harcourt',
  lastName: 'Full',
  zip: 2003,
  history: [140, 220, 345, 362, 364]
});

// Delete any previous data
mongoose.connection.dropDatabase(function() {

  // Save the new data
  harcourt.save(function(error) {
    if (error) console.error(error.stack);

    torrey.save(function(error) {
      if (error) console.error(error.stack);

      lee.save(function(error) {
        if (error) console.error(error.stack);

        // Disconnect
        mongoose.connection.close(function() {
          console.log('Database is ready.');
        });
      });
    });
  });
});
