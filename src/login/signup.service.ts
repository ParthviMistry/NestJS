import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { Signup, SignupDocument } from './signup.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel(Signup.name) private signupModel: Model<SignupDocument>,
  ) {}

  async getUserByUsername(username: string) {
    return this.signupModel
      .findOne({
        username,
      })
      .exec();
  }

  async findOneByEmail(email: string) {
    const user = await this.signupModel.findOne({ email });
    
    if (!user) throw new HttpException('User does not exist!', 404);

    return user;
  }

  async registerUser(signup: Signup) {
    const createUser = new this.signupModel(signup);
    const user = await this.getUserByUsername(createUser.name);

    if (user) throw new BadRequestException();

    return createUser.save();
  }
}
