const dbConnection = require('../db/dbConnection');

exports.validateKeys = ([body]) => {
  if (
    body.data[0] !== 'meter_reading_id' ||
    body.data[1] !== 'account_id' ||
    body.data[2] !== 'reading'
  ) {
    return Promise.reject({
      status: 400,
      msg: `Invalid format. Please refer to the template CSV`
    });
  }
};

exports.sendReadings = (readings) => {
  return dbConnection
    .select('*')
    .from('accounts')
    .then((accounts) => {
      const invalid = [];

      const validId = readings.filter(({ data }) => {
        const isValid = accounts.find(
          ({ account_id }) => account_id === data[1]
        );
        if (!isValid) invalid.push(data);
        return isValid;
      });

      const unique = validId.filter((item, index, array) => {
        const single =
          array.map((mapItem) => mapItem.data[0]).indexOf(item.data[0]) ===
          index;
        if (!single) invalid.push(item.data);
        return single;
      });

      const validReading = unique.filter(({ data }) => {
        const validReading = /^\d{4}$/g.test(data[2]);
        if (!validReading) {
          invalid.push(data);
        }
        return validReading;
      });

      const validFormatted = validReading.map(({ data }) => {
        return {
          meter_reading_id: data[0],
          account_id: data[1],
          reading: parseInt(data[2])
        };
      });
      const invalidFormatted = invalid
        .filter((data, index) => {
          return index !== 0;
        })
        .map((data) => {
          return {
            meter_reading_id: data[0],
            account_id: data[1],
            reading: parseInt(data[2])
          };
        });
      return (
        dbConnection('readings')
          .insert(validFormatted)
          // .onConflict('meter_reading_id')
          // .ignore()
          .then(() => {
            return {
              validSubmissions: validFormatted,
              invalidSubmissions: invalidFormatted
            };
          })
      );
    })
    .catch((err) => console.log(err));
};

exports.fetchReadings = () => {
  return dbConnection
    .select('*')
    .from('readings')
    .catch((err) => console.log(err));
};
