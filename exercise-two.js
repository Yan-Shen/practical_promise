'use strict';

var Promise = require('bluebird'),
  async = require('async'),
  exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
  promisifiedReadFile = exerciseUtils.promisifiedReadFile,
  blue = exerciseUtils.blue,
  magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st) {
  return st.toUpperCase();
});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
};

// runs every problem given as command-line argument to process
args.forEach(function(arg) {
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. log poem two stanza one and stanza two, in any order
   *    but log 'done' when both are done
   *    (ignore errors)
   *    note: reads are occurring in parallel (simultaneously)
   *
   */
  // callback version
  // async.each(
  //   ['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function(filename, eachDone) {
  //     readFile(filename, function(err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function(err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );
  // promise version
  //   var p1 = promisifiedReadFile('poem-two/stanza-01.txt').then(function(str) {
  //     console.log('-- A. callback version --');
  //     blue(str);
  //   });
  //   var p2 = promisifiedReadFile('poem-two/stanza-02.txt').then(function(str) {
  //     console.log('-- A. callback version --');
  //     blue(str);
  //   });
  //   Promise.all([p1, p2]).then(function(data) {
  //     console.log('data', data);
  //     console.log('-- A. callback version done --');
  //   });
}

function problemB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. log all the stanzas in poem two, in any order
   *    and log 'done' when they're all done
   *    (ignore errors)
   *    note: reads are occurring in parallel (simultaneously)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function(n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // console.log('filenames', filenames);
  // callback version
  // async.each(
  //   filenames,
  //   function(filename, eachDone) {
  //     readFile(filename, function(err, stanza) {
  //       console.log('-- B. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function(err) {
  //     console.log('-- B. callback version done --');
  //   }
  // );

  // var arrayFullOfPromises = filenames.map(function(fileName) {
  //   return promisifiedReadFile(fileName);
  // });

  // // promise version
  // Promise.each(arrayFullOfPromises, function(str) {
  //   console.log('-- B. callback version --');
  //   blue(str);
  // }).then(function() {
  //   console.log('-- B. callback version done --');
  // });
}

function problemC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. read & log all the stanzas in poem two, *in order*
   *    and log 'done' when they're all done
   *    (ignore errors)
   *    note: reads are occurring in series (only when previous finishes)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function(n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
  // async.eachSeries(
  //   filenames,
  //   function(filename, eachDone) {
  //     readFile(filename, function(err, stanza) {
  //       console.log('-- C. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function(err) {
  //     console.log('-- C. callback version done --');
  //   }
  // );

  // promise version
  // var arrayFullOfPromises = filenames.map(function(fileName) {
  //   return promisifiedReadFile(fileName);
  // });

  // // promise version
  // Promise.each(arrayFullOfPromises, function(str) {
  //   console.log('-- C. callback version --');
  //   blue(str);
  // }).then(function() {
  //   console.log('-- C. callback version done --');
  // });
}

function problemD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. log all the stanzas in poem two, *in order*
   *    making sure to fail for any error and log it out
   *    and log 'done' when they're all done
   *    note: reads are occurring in series (only when previous finishes)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function(n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version
  // async.eachSeries(
  //   filenames,
  //   function(filename, eachDone) {
  //     readFile(filename, function(err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function(err) {
  //     if (err) magenta(err);
  //     console.log('-- D. callback version done --');
  //   }
  // );

  // promise version
  var arrayFullOfPromises = filenames.map(function(fileName) {
    return promisifiedReadFile(fileName);
  });

  // promise version
  Promise.each(arrayFullOfPromises, function(str) {
    console.log('-- D. callback version --');
    blue(str);
  }).catch(function(err) {
    magenta(err);
    console.log('-- D. callback version done --');
  });
}

function problemE() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. make a promisifed version of fs.writeFile
   *
   */

  // fs.writeFile('message.txt', 'Hello Node.js', err => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });

  var fs = require('fs');
  function promisifiedWriteFile(filename, str) {
    // your code here
    return new Promise((resolve, reject) => {
      // do something asynchronous which eventually calls either:
      fs.writeFile(filename, str, function(err, filename) {
        /* body... */
        if (err) reject(err);
        else resolve(filename);
      });
    });
  }
}
