const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
const cors = require('cors');

const AppErr = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');
const userRouter = require('./routes/users.router');
const repairsRouter = require('./routes/repairs.router');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

//Rutas
app.use(morgan('dev'));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairsRouter);

app.all('*', (req, res, next) => {
    const err = new Error(`Cant find ${req.originalUrl} on this server BAD URL`);
    err.status = 'error';
    err.statusCode = 404;

    next(err);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// app.use(globalErrorHandler);
module.exports = app;