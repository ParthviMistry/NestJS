import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type SignupDocument = Signup & Document;

@Schema()
export class Signup {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const SignupSchema = SchemaFactory.createForClass(Signup);

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
SignupSchema.pre('save', function (next) {
  let user = this;
  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) return next();
  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

SignupSchema.methods.checkPassword = function (attempt, callback) {
  let user = this;
  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
