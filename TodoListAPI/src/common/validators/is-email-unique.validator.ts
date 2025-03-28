import { Injectable } from '@nestjs/common';
import { ValidatorConstraintInterface } from 'class-validator';

@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {}
