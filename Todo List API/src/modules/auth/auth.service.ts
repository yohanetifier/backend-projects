import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/application/user.service';
import { GetUserDTO } from '../user/dto/get-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { TodoService } from '../todo/application/todo.service';
import { User } from '../user/domain/user.entity';
import { Todo } from '../todo/domain/todo.entity';
import { UpdateTodoDTO } from '../todo/dto/update-todo-dto';

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
        throw new BadRequestException('Wrong password');
      }
    } else {
      throw new BadRequestException('Not user in the DB for this email ');
    }
  }

  async signUp(credentials: CreateUserDTO) {
    try {
      const user = await this.userService.createUser(credentials);
      return this.generateToken(user.id, user.name);
    } catch {
      throw new BadRequestException('User already exist');
    }
  }

  async generateToken(id: number, name: string) {
    const PAYLOAD = { sub: id, name };
    const accessToken = await this.jwtService.signAsync(PAYLOAD, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.signAsync(PAYLOAD, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        ignoreExpiration: false,
      });

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, name: payload.name },
        {
          expiresIn: '15m',
        },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  createTodo(id: User['id'], todo: CreateTodoDTO) {
    return this.todoService.createTodo(id, todo);
  }
  updateTodo(userId: Todo['userId'], id: Todo['id'], todo: UpdateTodoDTO) {
    return this.todoService.updateTodo(userId, id, todo);
  }
  deleteTodo(userId: Todo['userId'], id: Todo['id']) {
    return this.todoService.deleteTodo(userId, id);
  }
  getTodo(userId: Todo['userId'], page?: number, limit?: number) {
    return this.todoService.getTodo(userId, page, limit);
  }
}
