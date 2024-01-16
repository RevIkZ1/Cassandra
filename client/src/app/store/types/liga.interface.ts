import { EntityState } from '@ngrx/entity';
import { Liga, LigaModel } from './liga.module';

export interface LigaState extends EntityState<LigaModel> {
  isLoading: boolean;
  liga: Liga | null;
  error: string | null;
  update: boolean;
}
