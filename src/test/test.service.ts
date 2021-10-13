import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../entities/Test';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { SuccessResponseTemplate } from '../common/response/success-response-template';
import * as sc from '../common/response/status-code';
import * as rm from '../common/response/response-message';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from '../entities/Log';
import { Model } from 'mongoose';
import { Question } from '../entities/Question';
import ymc from 'youtube-mp3-converter';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectModel(Log.name)
    private logModel: Model<LogDocument>,
  ) {}

  async getTests() {
    // TODO: 정렬
    const tests = await this.testRepository.find({});
    return new SuccessResponseTemplate(sc.OK, rm.GET_TESTS_SUCCESS, tests);
  }

  async getSpecificTest(id) {
    const test = await this.testRepository.findOne({ id });
    if (!test) {
      return new BadRequestException(rm.WRONG_INDEX);
    }

    test.visitCount += 1;
    await this.testRepository.save(test);
    const log = new this.logModel(new Log(1));
    await log.save();

    const questions = await this.questionRepository.find({
      where: { TestId: id },
    });
    // TODO: 형식변환
    return new SuccessResponseTemplate(
      sc.OK,
      rm.GET_QUESTIONS_SUCCESS,
      questions,
    );
  }

  async hideTest(userId, testId) {
    const test = await this.testRepository.findOne({ where: { id: testId } });
    if (test.userId != userId) {
      return new UnauthorizedException(rm.NO_PERMISSION);
    }
    test.hidden = true;
    await this.testRepository.save(test);
    return new SuccessResponseTemplate(sc.OK, rm.HIDE_TEST_SUCCESS);
  }

  async getSpecificTestForUpdatePage(id) {
    const test = await this.testRepository.findOne({ id });
    if (!test) {
      return new BadRequestException(rm.WRONG_INDEX);
    }

    const questions = await this.questionRepository.find({
      where: { TestId: id },
    });
    // TODO: 형식변환
    return new SuccessResponseTemplate(
      sc.OK,
      rm.GET_QUESTIONS_SUCCESS,
      questions,
    );
  }

  async finishTest(testId) {
    const test = await this.testRepository.findOne({ where: { id: testId } });
    if (!test) {
      return new BadRequestException(rm.WRONG_INDEX);
    }
    test.finishCount += 1;
    await this.testRepository.save(test);
  }

  async getTestRecommendations() {
    // TODO: 추천알고리즘 적용
    await this.testRepository.find({
      take: 6,
    });
  }

  async createTest(id) {
    // TODO: 모듈적용
    // const convertLinkToMp3 = ymc(__dirname);
    // const path = await convertLinkToMp3('hi', {
    //   startTime: '00:00:00',
    //   duration: 1,
    //   title: 'foo',
    // });
  }

  async updateTest(userId, testId) {}
}
