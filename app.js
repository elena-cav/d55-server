const express = require('express');
var cors = require('cors');

const app = express();
const apiRouter = require('./routers/apiRouter.js');

const { handleCustomErrors } = require('./errors');
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.use(handleCustomErrors);
// app.use(handle400s);
// app.use(handle500s);

module.exports = app;
