import { createUser, findUserByEmail, verifyPassword } from '../models/user.model.js';
import { AuthenticationError, ConflictError } from '../utils/errors.js';
import { generateToken, setTokenCookie, clearTokenCookie } from '../validators/auth.validator.js';

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await createUser(email, password);
    const token = generateToken(user);
    setTokenCookie(res, token);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    if (error.code === '23505') { // unique violation
      next(new ConflictError('Email already exists'));
    } else {
      next(error);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await verifyPassword(password, user.password))) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = generateToken(user);
    setTokenCookie(res, token);
    res.json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  clearTokenCookie(res);
  res.json({ message: 'Logged out successfully' });
}; 