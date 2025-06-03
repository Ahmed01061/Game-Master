import mongoose from 'mongoose';
import userRoles from '../utils/userRoles.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN],
        default: userRoles.USER,
    },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;