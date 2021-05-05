exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: 'Invalid method' });
};
