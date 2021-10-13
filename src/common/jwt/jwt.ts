import * as jwt from 'jsonwebtoken';
import * as jwtOptions from './jwt.options';
import { FailureResponseTemplate } from '../response/failure-response-template';
import * as sc from '../response/status-code';
import * as rm from '../response/response-message';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const jwtService = {
  async checkToken(token) {
    if (!token) {
      return new FailureResponseTemplate(sc.BAD_REQUEST, rm.EMPTY_TOKEN);
    }
    const user = await this.verify(token);

    if (user === TOKEN_EXPIRED) {
      return new FailureResponseTemplate(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN);
    }
    if (user === TOKEN_EXPIRED || !user.id) {
      return new FailureResponseTemplate(sc.UNAUTHORIZED, rm.INVALID_TOKEN);
    }

    return user.id;
  },

  async sign(user) {
    const payload = {
      id: user.id,
      name: user.userName,
    };
    // TODO: jwt option 넣기
    const { secretKey } = jwtOptions;
    console.log(process.env.JWT_SECERT_KEY);
    const result = {
      accessToken: jwt.sign(payload, secretKey),
      refreshToken: jwt.sign(payload, secretKey),
    };
    return result;
  },

  async verify(token) {
    let decoded;
    const { secretKey } = jwtOptions;
    console.log(secretKey);
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

export = jwtService;
