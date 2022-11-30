import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const validToken = (token: string): JwtPayload => {
  console.log('algo');
  const decode = jwt.verify(token, JWT_SECRET);
  return decode as JwtPayload;
};

export default { validToken };
