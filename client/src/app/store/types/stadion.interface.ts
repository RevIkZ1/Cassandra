import { EntityState } from '@ngrx/entity';
import { Stadion, StadionModel } from './stadion.module';

export interface StadionState extends EntityState<StadionModel> {
  isLoading: boolean;
  stadion: Stadion | null;
  error: string | null;
  update: boolean;
}
