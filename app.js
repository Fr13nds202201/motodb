const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");


const userRouter = require('./routes/users.router');
const repairsRouter = require('./routes/repairs.router');


app.use(morgan('dev'));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairsRouter);

app.listen(3000, () => {
    console.log("App running on port 3000");
});

module.exports = app;