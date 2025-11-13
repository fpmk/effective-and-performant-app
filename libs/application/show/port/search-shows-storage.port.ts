import { Show } from '@domain/show/entity';
import { Observable } from 'rxjs';

/**
 * This is optional storage for latest found shows
 * So when we return to search page we should see latest data
 * It can be done with State manager as well. But for simplicity I prefer to use just memory storage
 * Returning Observable instead of static, to have more universal implementation in the future, there can be async storage or whatever
 */
export abstract class SearchShowsStoragePort {
  abstract storeLatestFoundShows(shows: Show[]): Observable<void>;

  abstract storeLatestQuery(query: string): Observable<void>;

  abstract getLatestFoundShows(): Observable<Show[]>;

  abstract getLatestQuery(): Observable<string>;

  abstract clear(): Observable<void>;
}
