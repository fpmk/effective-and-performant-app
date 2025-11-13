import { Observable } from 'rxjs';
import { Show } from '@domain/show/entity';

export abstract class ShowsPort {

  // if we have framework dependant code, then we can use Observables here, otherwise we need to use Promises
  abstract searchShow(query: string): Observable<Show[]>;

  abstract allShows(page: number): Observable<Show[]>;
}
