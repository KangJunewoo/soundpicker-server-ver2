import { Controller, Delete, Get, Param, Headers, Post, Put, Body } from '@nestjs/common';

@Controller('test')
export class TestController {
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
