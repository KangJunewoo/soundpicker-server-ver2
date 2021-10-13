import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { SignupInfoDto } from './dto/signup-info.dto';
import * as rm from '../common/response/response-message';
import * as sc from '../common/response/status-code';
import * as crypto from 'crypto';
import { SuccessResponseTemplate } from '../common/response/success-response-template';
import { LoginInfoDto } from './dto/login-info.dto';
import * as jwtService from '../common/jwt/jwt';

// TODO: 에러 커스텀 템플릿 적용
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  ///// repository /////
  async emailCheck(email) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async nicknameCheck(nickname) {
    return this.userRepository.findOne({
      where: { nickname },
    });
  }

  async getUserById(id) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async saveUser(user) {
    return this.userRepository.save(user);
  }

  ///// repository end /////

  ///// service /////
  async signUp(signupInfo: SignupInfoDto): Promise<any> {
    try {
      const { email, password, nickname } = signupInfo;
      if (!email || !password || !nickname) {
        return new BadRequestException(rm.NULL_VALUE);
      }
      const alreadyEmail = await this.emailCheck(email);
      const alreadyNickname = await this.nicknameCheck(nickname);

      if (alreadyEmail) {
        return new BadRequestException(rm.ALREADY_EMAIL);
      } else if (alreadyNickname) {
        return new BadRequestException(rm.ALREADY_NICKNAME);
      } else {
        const salt = crypto.randomBytes(64).toString('base64');
        const hashedPassword = crypto
          .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
          .toString('base64');
        await this.userRepository.save({
          email,
          password: hashedPassword,
          nickname,
          salt,
        });
        return new SuccessResponseTemplate(sc.OK, rm.SIGN_UP_SUCCESS, {
          email,
          nickname,
        });
      }
    } catch (error) {
      console.error(error);
      return new InternalServerErrorException(rm.SIGN_UP_FAIL);
    }
  }

  async signIn(loginInfoDto: LoginInfoDto) {
    const { email, password } = loginInfoDto;

    if (!email || !password) {
      console.log('필요한 값이 없습니다!');
      return new BadRequestException(rm.NULL_VALUE);
    }

    const user = await this.emailCheck(email);
    if (!user) {
      return new BadRequestException(rm.NO_EMAIL);
    }

    if (
      user.password !=
      crypto
        .pbkdf2Sync(password, user.salt, 10000, 64, 'sha512')
        .toString('base64')
    ) {
      console.log('비밀번호가 일치하지 않습니다.');
      return new BadRequestException(rm.MISS_MATCH_PW);
    }

    const { accessToken, refreshToken } = await jwtService.sign(user);
    return new SuccessResponseTemplate(sc.OK, rm.SIGN_IN_SUCCESS, {
      accessToken,
      refreshToken,
      nickname: user.nickname,
    });
  }

  async checkEmail(email) {
    if (!email) {
      return new BadRequestException(rm.NULL_VALUE);
    }
    const alreadyEmail = await this.emailCheck(email);
    if (alreadyEmail) {
      console.log('이미 존재하는 이메일 입니다.');
      return new BadRequestException(rm.ALREADY_EMAIL);
    }
    return new SuccessResponseTemplate(sc.OK, rm.USABLE_EMAIL, { email });
  }

  async checkNickname(nickname) {
    if (!nickname) {
      return new BadRequestException(rm.NULL_VALUE);
    }
    const alreadyNickname = await this.nicknameCheck(nickname);
    if (alreadyNickname) {
      return new BadRequestException(rm.ALREADY_NICKNAME);
    }
    return new SuccessResponseTemplate(sc.OK, rm.USABLE_NICKNAME, { nickname });
  }

  async getMyInfo(id) {
    // TODO: 쿼리최적화 가능할듯.
    const user = await this.getUserById(id);
    if (!user) {
      return new BadRequestException(rm.MYPAGE_BRING_FAIL);
    }
    return new SuccessResponseTemplate(sc.OK, rm.MYPAGE_BRING_SUCCESS, {
      user,
    });
  }

  async changeEmail(id, email) {
    const user = await this.getUserById(id);
    if (!user) {
      return new BadRequestException(rm.MYPAGE_BRING_FAIL);
    }
    if (await this.emailCheck(email))
      return new BadRequestException(rm.ALREADY_EMAIL);

    user.email = email;
    await this.saveUser(user);
  }

  async changeNickname(id, nickname) {
    const user = await this.getUserById(id);
    if (!user) {
      return new BadRequestException(rm.MYPAGE_BRING_FAIL);
    }
    if (await this.nicknameCheck(nickname)) {
      return new BadRequestException(rm.ALREADY_NICKNAME);
    }

    user.nickname = nickname;
    await this.saveUser(user);
  }

  async changePassword(id, password) {
    const user = await this.getUserById(id);
    if (!user) {
      return new BadRequestException(sc.BAD_REQUEST, rm.MYPAGE_BRING_FAIL);
    }

    const salt = crypto.randomBytes(64).toString('base64');
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('base64');

    user.salt = salt;
    user.password = hashedPassword;
    await this.saveUser(user);
  }
}
