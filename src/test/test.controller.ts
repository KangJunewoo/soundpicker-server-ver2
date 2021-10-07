import { Controller, Delete, Get, Param, Headers, Post, Put, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseTemplateDto } from '../common/dto/responseTemplate.dto';

@ApiTags('TEST')
@ApiResponse({
  status: 200,
  description: '성공',
  type: ResponseTemplateDto
})
@ApiResponse({
  status: 500,
  description: '서버 에러',
  type: ResponseTemplateDto
})
@Controller('test')
export class TestController {
  @ApiOperation({ summary: '전체 테스트 조회' })
  @Get()
  getWholeTests() {

  }

  @Get('recommendation')
  getRecommendedTests() {

  }

  @Get(':testId')
  getSpecificTest(@Param('testId') testId: number) {

  }

  @Get(':testId/updatepage')
  getSpecificTestForUpdatePage() {

  }


  @Post()
  createTest(@Headers('jwt') jwt: string, @Body() body) {
    const { title, description, CategoryId, questions } = body;
    for (const question of questions) {
      const { questionNumber, questionYoutubeURL, questionStartsfrom, hint, answer, answerYoutubeURL } = question;
      console.log(
        questionNumber,
        questionYoutubeURL,
        questionStartsfrom,
        hint,
        answer,
        answerYoutubeURL
      );
    }

  }

  @Put(':testId')
  modifyTest(@Headers('jwt') jwt: string, @Body() body, @Param('testId') testId: number) {
    const { title, description, CategoryId, questions } = body;
    for (const question of questions) {
      const { questionNumber, questionYoutubeURL, questionStartsfrom, hint, answer, answerYoutubeURL } = question;
      console.log(
        questionNumber,
        questionYoutubeURL,
        questionStartsfrom,
        hint,
        answer,
        answerYoutubeURL
      );
    }
  }

  @Delete(':testId')
  deleteTest(@Headers('jwt') jwt: string) {
    console.log(jwt);

  }

}
