import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import connectDB from './src/config/db.js';

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

