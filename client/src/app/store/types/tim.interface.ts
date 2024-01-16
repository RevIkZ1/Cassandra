import { EntityState } from '@ngrx/entity';
import { Tim, TimModel } from './tim.module';

export interface TimState extends EntityState<TimModel> {
  isLoading: boolean;
  tim: Tim | null;
  error: string | null;
  update: boolean;
}
