export interface UserRepository {
  createUser: () => string;
  getUser: () => string;
  updateUser: () => string;
  deleteUser: () => string;
}
