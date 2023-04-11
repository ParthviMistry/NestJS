import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { SignupService } from './signup.service';
import { Signup } from './signup.schema';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @Post()
  registerUser(@Body() signup: Signup) {
    return this.signupService.registerUser(signup);
  }

  @Get('/:email')
  async getUserByEmail(@Res() response: any, @Param('email') email: string) {
    const user = await this.signupService.findOneByEmail(email);

    return response.status(HttpStatus.OK).json({
      user,
    });
  }
}
