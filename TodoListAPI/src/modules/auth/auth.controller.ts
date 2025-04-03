import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { GetUserDTO } from '../user/dto/get-user.dto';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { UpdateTodoDTO } from '../todo/dto/update-todo-dto';
import { convertStringToNumber } from '../utils/convertStringToNumber';
import { Response } from 'express';

type Transformer<T, K extends keyof T, V> = { [P in K]: V };

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() user: GetUserDTO) {
    // console.log('user', user);
    return this.authService.signIn(user);
  }
  // @Post('register')
  // signUp(@Body() user: CreateUserDTO) {
  //   return this.authService.signUp(user);
  // }

  // @Get('todos')
  // @UseGuards(AuthGuard)
  // paginateTodos(
  //   @Query() query: Transformer<{ page; limit }, 'page' | 'limit', string>,
  //   @Request() req,
  // ) {
  //   const { sub } = req.user;
  //   const convertPageToNumber = convertStringToNumber(query.page);
  //   const convertLimitToNumber = convertStringToNumber(query.limit);
  //   return this.authService.getTodo(
  //     sub,
  //     convertPageToNumber,
  //     convertLimitToNumber,
  //   );
  // }

  // @Post('todos')
  // @UseGuards(AuthGuard)
  // createTodo(@Request() req, @Body() todo: CreateTodoDTO) {
  //   const { sub } = req.user;
  //   return this.authService.createTodo(sub, todo);
  // }

  // @Put('todos/:id')
  // @UseGuards(AuthGuard)
  // updateTodo(
  //   @Param('id') id: string,
  //   @Body() todo: UpdateTodoDTO,
  //   @Request() req,
  // ) {
  //   const { sub } = req.user;
  //   const convertIdToNumber = convertStringToNumber(id);
  //   return this.authService.updateTodo(sub, convertIdToNumber, todo);
  // }

  // @Delete('todos/:id')
  // @UseGuards(AuthGuard)
  // async deleteTodo(
  //   @Param('id') id: string,
  //   @Request() req,
  //   @Res() res: Response,
  // ) {
  //   const { sub } = req.user;
  //   const convertIdToNumber = convertStringToNumber(id);
  //   const isDeleted = await this.authService.deleteTodo(sub, convertIdToNumber);
  //   if (isDeleted) {
  //     return res.status(HttpStatus.NO_CONTENT).send();
  //   } else {
  //     return res
  //       .status(HttpStatus.NOT_FOUND)
  //       .json({ message: 'Todo not found' });
  //   }
  // }
  // @Post('refresh-token')
  // refreshToken(@Body('refreshToken') refreshToken: string) {
  //   return this.authService.refreshToken(refreshToken);
  // }
}
