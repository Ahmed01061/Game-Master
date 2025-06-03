import User from '../models/User';
import Cart from '../models/Cart';
import { generateToken } from '../utils/jwtHelper';
import ApiError from '../utils/apiError';

const registerUser = async (userData) => {
    const { name, email, password } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError('User already exists with this email', 400);
    }

    const user = await User.create({ name, email, password });

    await Cart.create({ user: user._id, items: [], totalPrice: 0 });


    const userResponse = user.toObject();
    delete userResponse.password;

    return { user: userResponse, token: generateToken(user._id) };
};

const loginUser = async (loginData) => {
    const { email, password } = loginData;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError('Invalid email or password', 401);
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    return { user: userResponse, token: generateToken(user._id) };
};

export { registerUser, loginUser };