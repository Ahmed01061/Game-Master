require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

const app = express();

connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 







const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

