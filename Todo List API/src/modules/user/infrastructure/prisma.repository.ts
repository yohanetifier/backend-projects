import { UserRepository } from '../domain/user.repository';

export class PrismaRepository implements UserRepository {
  updateUser: () => string;
  // constructor() {}
  getUser() {
    return 'get User function';
  }
  createUser() {
    return 'createUser';
  }

  deleteUser() {
    return 'User delete';
  }
}
