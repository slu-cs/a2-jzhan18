// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

// What documents are in the collection?
const queries = [
  // How many registered voters live in the Canton zip code (13617)?
  Voter.find().where('zip').equals('13617');
  // What are the full names of all the registered voters whose first-name is STARR?
  Voter.find().where('firstName').equals('STARR');
  // How many people voted in the 2016 general election (GE16)?
  Voter.find().where('history').in('GE16');
  // What is the last-name that comes last in the county in alphabetical order?
  Voter.find().sort('-lastName').limit(1);
  // How many zip codes does the county contain?
  Voter.distinct('zip');
];


// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Number of voters live in the Canton zip code (13617): ', results[0].length);
    console.log('Full names of all the registered voters whose first-name is STARR: ', results[1].map(p => p.firstName + ' ' + p.lastName));
    console.log('Number of people voted in the 2016 general election: ', results[2].length);
    console.log('Last-name that comes last in the county in alphabetical order: ', results[3].lastName);
    console.log('Number of zip codes the county contain: ', results[4].length);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
