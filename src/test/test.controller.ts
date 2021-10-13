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

  constructor(private testService:TestService) {
  }

  @ApiOperation({ summary: '전체 테스트 조회' })
  @Get()
  getWholeTests() {}

  @Get('recommendation')
  @ApiOperation({ summary: '추천 테스트 조회' })
  getRecommendedTests() {}

  @ApiOperation({ summary: '특정 테스트 조회' })
  @Get(':testId')
  getSpecificTest(@Param('testId') testId: number) {}

  @ApiOperation({ summary: '특정 테스트 조회 (수정페이지용)' })
  @Get(':testId/updatepage')
  getSpecificTestForUpdatePage() {}

  @ApiOperation({ summary: '테스트 생성' })
  @Post()
  createTest(@Headers('jwt') jwt: string, @Body() body) {
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
  modifyTest(
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
  deleteTest(@Headers('jwt') jwt: string) {
    console.log(jwt);
  }
}
