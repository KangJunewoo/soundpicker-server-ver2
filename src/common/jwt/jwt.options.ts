import * as dotenv from 'dotenv';

dotenv.config();
const jwtOptions = {
  secretKey: process.env.JWT_SECRET_KEY,
  options: {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: process.env.JWT_ISSUER,
  },
  refreshOptions: {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    issuer: process.env.JWT_ISSUER,
  },
};

export = jwtOptions;
