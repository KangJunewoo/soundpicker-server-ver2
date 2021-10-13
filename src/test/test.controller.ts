import {
  Controller,
  Delete,
  Get,
  Param,
  Headers,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FailureResponseTemplate } from '../common/response/failure-response-template';
import { SuccessResponseTemplate } from '../common/response/success-response-template';
import { TestService } from './test.service';
import jwtService from '../common/jwt/jwt';

@ApiTags('TEST')
@Controller('test')
@ApiResponse({
  status: 200,
  description: '성공',
  type: SuccessResponseTemplate,
})
@ApiResponse({
  status: 400,
  description: '클라이언트 에러',
  type: FailureResponseTemplate,
})
@ApiResponse({
  status: 500,
  description: '서버 에러',
  type: FailureResponseTemplate,
})
export class TestController {
  constructor(private testService: TestService) {}

  @ApiOperation({ summary: '전체 테스트 조회' })
  @Get()
  async getWholeTests() {
    return await this.testService.getTests();
  }

  @Get('recommendation')
  @ApiOperation({ summary: '추천 테스트 조회' })
  async getRecommendedTests() {
    return await this.testService.getTestRecommendations();
  }

  @ApiOperation({ summary: '특정 테스트 조회' })
  @Get(':testId')
  async getSpecificTest(@Param('testId') testId: number) {
    return await this.testService.getSpecificTest(testId);
  }

  @ApiOperation({ summary: '특정 테스트 조회 (수정페이지용)' })
  @Get(':testId/updatepage')
  async getSpecificTestForUpdatePage(@Param('testId') testId: number) {
    return await this.testService.getSpecificTestForUpdatePage(testId);
  }

  @ApiOperation({ summary: '테스트 생성' })
  @Post()
  async createTest(@Headers('jwt') jwt: string, @Body() body) {
    const { title, description, CategoryId, questions } = body;
    for (const question of questions) {
      const {
        questionNumber,
        questionYoutubeURL,
        questionStartsfrom,
        hint,
        answer,
        answerYoutubeURL,
      } = question;
      console.log(
        questionNumber,
        questionYoutubeURL,
        questionStartsfrom,
        hint,
        answer,
        answerYoutubeURL,
      );
    }
  }

  @ApiOperation({ summary: '테스트 수정' })
  @Put(':testId')
  async modifyTest(
    @Headers('jwt') jwt: string,
    @Body() body,
    @Param('testId') testId: number,
  ) {
    const { title, description, CategoryId, questions } = body;
    for (const question of questions) {
      const {
        questionNumber,
        questionYoutubeURL,
        questionStartsfrom,
        hint,
        answer,
        answerYoutubeURL,
      } = question;
      console.log(
        questionNumber,
        questionYoutubeURL,
        questionStartsfrom,
        hint,
        answer,
        answerYoutubeURL,
      );
    }
  }

  @ApiOperation({ summary: '테스트 삭제' })
  @Delete(':testId')
  async deleteTest(
    @Headers('jwt') jwt: string,
    @Param('testId') testId: number,
  ) {
    const { id } = await jwtService.verify(jwt);
    await this.testService.hideTest(id, testId);
    return await this.testService.getTestRecommendations();
  }
}
