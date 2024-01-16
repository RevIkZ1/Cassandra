import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { LoginDto, User } from './user.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }
  async findUserById(userId: number) {
    return this.userRepository.findUserById(userId);
  }
  async addUser(user: User) {
    return this.userRepository.addUser(user);
  }
  async getUserByUsernameAndPassword(username: string, password: string) {
    return this.userRepository.getUserByUsernameAndPassword(username, password);
  }
  async signIn(loginDto: LoginDto) {
    return this.userRepository.signIn(loginDto);
  }
  async getUserByUser(username: string) {
    return this.userRepository.getUserByUser(username);
  }
  async addTeamToUser(userId: string, teamId: string) {
    return this.userRepository.addTeamToUser(userId, teamId);
  }
  async VratiSveTimove(userID: string) {
    return this.userRepository.VratiSveTimove(userID);
  }
}
