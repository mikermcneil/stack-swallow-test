#!/usr/bin/node

const sails = require('sails');
const async = require('async');
const http  = require('http');

console.log('1. Lift Sails');
console.log('2. /bar/good - to show a full stack trace');
console.log('3. /bar/bad  - to show an overwritten stack trace');
console.log('\n\n\n\n\n\n\n\n');

async.waterfall(
  [
    // lift sails
    function (cb) {
      sails.lift({}, cb);
    },

    // make a call to "good" endpoint, that throws a useful stack trace
    function (arg, cb) {
      http.get('http://localhost:1337/bar/good', (response) => {
        var body = '';
        response.on('data', (d) => {
          body += d;
        });
        response.on('end', () => {
          console.log(body);
          return cb();
        });
      });
    },

    function (cb) {

      console.log('\n\n\n\n\n\n\n\n');
      console.log('a few lines of separation for easy visual');
      console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
      console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
      console.log('------------------------------------------------------------------------------------------------------------------------------------------------');
      console.log('\n\n\n\n\n\n\n\n');
      return cb();
    },

    // make a call to "bad" endpoint, that does NOT throw a useful stack trace
    function (cb) {
      http.get('http://localhost:1337/bar/bad', (response) => {
        var body = '';
        response.on('data', (d) => {
          body += d;
        });
        response.on('end', () => {
          console.log(body);
          return cb();
        });
      });
    },

  ],
  (error) => {
    if (error) {
      console.log(error);
    }

    // All done, exit
    console.log('All done - exiting');
    process.exit();
  }
);

