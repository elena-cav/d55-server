const dbConnection = require('../db/dbConnection');

exports.sendReadings = (readings) => {
  return dbConnection
    .select('*')
    .from('accounts')
    .then((accounts) => {
      const invalid = [];
      const valid = readings.filter(({ data }) => {
        const isValid = accounts.find(
          ({ account_id }) => account_id === data[1]
        );
        if (!isValid) invalid.push(data);
        return isValid;
      });
      const unique = valid.filter((item, index, array) => {
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
      console.log(invalid);
      const invalidFormatted = invalid.map((data, index) => {
        if (index !== 0) {
          return {
            meter_reading_id: data[0],
            account_id: data[1],
            reading: parseInt(data[2])
          };
        } else return {};
      });
      return dbConnection('readings')
        .insert(validFormatted)
        .returning('*')
        .then((data) => {
          return {
            validSubmissions: data,
            invalidSubmissions: invalidFormatted
          };
        });
    })
    .catch((err) => console.log(err));
};
