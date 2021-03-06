// Store some data in the voter database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const readline = require('readline');
const fs = require('fs');
// File configuration
const file = readline.createInterface ({
  input: fs.createReadStream('voters.csv')
});

connect(); // To the database
// Create voters
const voters = [];

// Asynchronous line-by-line input
file.on('line',function(line) {
  const info = line.split(',');
  voters.push(new Voter({
    firstName: info[0],
    lastName: info[1],
    zip: info[2],
    history: info[3]
    }));
});

file.on('close', function() {
  mongoose.connection.dropDatabase()
    .then(() => Promise.all(voters.map(v => v.save())))
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.error(error.stack));
});
