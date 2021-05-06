const format = (readings, isValid = true) => {
  whichReadings = isValid
    ? readings
    : readings.filter((data, index) => {
        return index !== 0;
      });
  return whichReadings.map(({ data }) => {
    return {
      meter_reading_id: data[0],
      account_id: data[1],
      reading: parseInt(data[2])
    };
  });
};

exports.getValidAndInvalid = (readings, accounts) => {
  const invalid = [];
  const validId = readings.filter((reading) => {
    const isValid = accounts.find(
      ({ account_id }) => account_id === reading.data[1]
    );
    if (!isValid) invalid.push(reading);
    return isValid;
  });

  const unique = validId.filter((item, index, array) => {
    const single =
      array.map((mapItem) => mapItem.data[0]).indexOf(item.data[0]) === index;
    if (!single) invalid.push(item);
    return single;
  });

  const valid = unique.filter((reading) => {
    const validReading = /^\d{4}$/g.test(reading.data[2]);
    if (!validReading) {
      invalid.push(reading);
    }
    return validReading;
  });

  return { valid: format(valid), invalid: format(invalid, false) };
};
