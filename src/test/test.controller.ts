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
import { ResponseTemplate } from '../common/dto/response-template';

@ApiTags('TEST')
@ApiResponse({
  status: 200,
  description: '성공',
  type: ResponseTemplate,
})
@ApiResponse({
  status: 500,
  description: '서버 에러',
  type: ResponseTemplate,
})
@Controller('test')
export class TestController {
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
