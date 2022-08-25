const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

//routes
const userRoute = require('./routes/user');
const tourRoute = require('./routes/tour');

const app = express();

app.use(morgan("dev"));
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes
app.use("/users", userRoute);
app.use("/tour", tourRoute);

const DB = mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB Connected Successfully");
    app.listen(process.env.PORT, () => {
        console.log(`app is listening on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(`Error ${err}`);
})

module.exports = app;
