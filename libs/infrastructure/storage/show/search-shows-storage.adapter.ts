import { SearchShowsStoragePort } from '@application/show/port';
import { Show } from '@domain/show/entity';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Maybe not use @Injectable at all if this a local storage.
 */
@Injectable({ providedIn: 'root' })
export class SearchShowsStorageAdapter extends SearchShowsStoragePort {
  private _latestShows: Show[] = [];
  private _latestQuery = '';

  storeLatestFoundShows(shows: Show[]): Observable<void> {
    this._latestShows = shows;
    return of(void 0);
  }

  storeLatestQuery(query: string): Observable<void> {
    this._latestQuery = query;
    return of(void 0);
  }

  getLatestQuery(): Observable<string> {
    return of(this._latestQuery);
  }

  getLatestFoundShows(): Observable<Show[]> {
    return of(this._latestShows);
  }

  clear(): Observable<void> {
    this._latestQuery = '';
    this._latestShows = [];
    return of(void 0);
  }
}
