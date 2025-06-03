import authService from '../services/authService';
import asyncHandler from 'express-async-handler';

const register = asyncHandler(async (req, res, next) => {
    const { user, token } = await authService.registerUser(req.body);
    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: { user, token },
    });
});

const login = asyncHandler(async (req, res, next) => {
    const { user, token } = await authService.loginUser(req.body);
    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: { user, token },
    });
});

export { register, login };