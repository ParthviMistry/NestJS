import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { SignupController } from './signup.controller';
import { SignupSchema } from './signup.schema';
import { SignupService } from './signup.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: SignupSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  exports: [SignupService],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
