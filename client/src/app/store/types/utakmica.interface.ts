import { EntityState } from '@ngrx/entity';
import { Utakmica, UtakmicaModel } from './utakmica.module';

export interface UtakmicaState extends EntityState<UtakmicaModel> {
  isLoading: boolean;
  utakmica: Utakmica | null;
  error: string | null;
  update: boolean;
}
