import { verifyToken } from '../utils/jwtHelper.js';
import User from '../models/User.js';
import ApiError from '../utils/apiError.js'; 
import asyncHandler from 'express-async-handler'; 

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);
            req.user = await User.findById(decoded.id).select('-password'); 

            if (!req.user) {
                return next(new ApiError('The user belonging to this token does no longer exist.', 401));
            }
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                 return next(new ApiError('Invalid token. Please log in again!', 401));
            }
            if (error.name === 'TokenExpiredError') {
                return next(new ApiError('Your token has expired! Please log in again.', 401));
            }
            return next(new ApiError('Not authorized, token failed', 401));
        }
    }

    if (!token) {
        return next(new ApiError('Not authorized, no token', 401));
    }
});

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(
                new ApiError(`User role ${req.user ? req.user.role : 'guest'} is not authorized to access this route`, 403)
            );
        }
        next();
    };
};

export { protect, authorize };