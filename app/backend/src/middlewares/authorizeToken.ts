import { RequestHandler } from 'express';
import validation from './validateToken';

const tokenValidation:RequestHandler = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const response = validation.validToken(token);
    res.locals.email = response.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default { tokenValidation };
