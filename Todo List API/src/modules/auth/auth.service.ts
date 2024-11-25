import { Injectable } from '@nestjs/common';
import { UserService } from '../user/application/user.service';
import { GetUserDTO } from '../user/dto/get-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { TodoService } from '../todo/application/todo.service';
import { User } from '../user/domain/user.entity';
import { Todo } from '../todo/domain/todo.entity';
import { UpdateTodoDTO } from '../todo/dto/update-todo';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private todoService: TodoService,
    private jwtService: JwtService,
  ) {}
  async signIn(credentials: GetUserDTO): Promise<any> {
    const user = await this.userService.getUser(credentials);

    if (user) {
      const isGoodPassword = bcrypt.compareSync(
        credentials.password,
        user.password,
      );

      if (isGoodPassword) {
        return await this.generateToken(user.id, user.name);
      } else {
        throw new Error('Wrong password');
      }
    } else {
      throw new Error('Not user in the DB for this email ');
    }
  }

  async signUp(credentials: CreateUserDTO) {
    const user = await this.userService.createUser(credentials);
    if (user) {
      return this.generateToken(user.id, user.name);
    } else {
      throw new Error('User already exist');
    }
  }
  async generateToken(id: number, name: string) {
    const PAYLOAD = { sub: id, name };
    const ACCESS_TOKEN = await this.jwtService.signAsync(PAYLOAD);
    return { token: ACCESS_TOKEN };
  }
  createTodo(id: User['id'], todo: CreateTodoDTO) {
    return this.todoService.createTodo(id, todo);
  }
  updateTodo(todo: UpdateTodoDTO) {
    return this.todoService.updateTodo(todo);
  }
}
