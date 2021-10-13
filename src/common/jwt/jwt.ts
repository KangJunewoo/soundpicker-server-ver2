import * as jwt from 'jsonwebtoken';
import { secretKey } from './jwt.options';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  async sign(user) {
    const payload = {
      id: user.id,
      name: user.userName,
    };
    // TODO: jwt option 넣기
    const result = {
      accessToken: jwt.sign(payload, secretKey),
      refreshToken: jwt.sign(payload, secretKey),
    };
    return result;
  },

  async verify(token) {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log('invalid token');
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
  // TODO: refresh 호출
};
