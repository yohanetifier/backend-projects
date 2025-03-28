import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/modules/user/application/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private user: UserService) {}

  //   async validate(user: User) {
  //     const isExistingUser = await this.user.getUser(user.email);
  //     return !!isExistingUser;
  //   }
}
