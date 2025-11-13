import { Show } from '@domain/show/entity';
import { Observable } from 'rxjs';

export abstract class ShowsStoragePort {
  abstract storeShows(page: number, shows: Show[]): Observable<void>;

  abstract getShows(page: number): Observable<Show[] | null>;

  abstract clear(): Observable<void>;
}
