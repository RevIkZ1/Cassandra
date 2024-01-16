import { EntityState } from '@ngrx/entity';
import { Igrac, IgracModel } from './igrac.module';

export interface IgracState extends EntityState<IgracModel> {
  isLoading: boolean;
  igrac: Igrac | null;
  error: string | null;
  update: boolean;
  domaci: IgracModel[];
  gostujuci: IgracModel[];
}
