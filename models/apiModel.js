const fs = require('fs');

exports.fetchAllEndpoints = () =>
  new Promise((res, rej) => {
    fs.readFile('./endpoints.json', 'utf8', (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
