// Store some data in the voter database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./shcema');

connect(); // To the database

const readline = require('readline');
const fs = require('fs');
// File configuration
const file = readline.createInterface ({
  input: fs.createReadStream('./voters.csv')
});
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

file.on('close', funciton() {
  mongoose.connection.dropDatabase()
    .then(() => voters.map(v => v.save()))
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.error(error.stack));
});
