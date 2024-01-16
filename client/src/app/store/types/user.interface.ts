import { EntityState } from '@ngrx/entity';
import { User, UserModel } from './user.module';

export interface UserState extends EntityState<UserModel> {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  user: UserModel | null;
}
