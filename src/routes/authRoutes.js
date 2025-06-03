import express from 'express';
import authController from '../controllers/authController';
const { registerValidation, loginValidation } = require('../validations/authValidation');
const handleValidationErrors = require('../middlewares/validationMiddleware'); // Dev4 creates this

const router = express.Router();

router.post('/register', registerValidation, handleValidationErrors, authController.register);
router.post('/login', loginValidation, handleValidationErrors, authController.login);

export  {router};