import { RequestHandler } from 'express';
import validation from './validateToken';

const tokenValidation:RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const response = validation.validToken(authorization);
    res.locals.email = response.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default { tokenValidation };
