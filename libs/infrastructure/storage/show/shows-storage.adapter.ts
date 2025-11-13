import { ShowsStoragePort } from '@application/show/port';
import { Show } from '@domain/show/entity';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Simple cache for paged TV Shows, it can be replaced with any implementation - Indexed DB or time based cache.
 * Warning! For testing purposes only
 */
@Injectable({ providedIn: 'root' })
export class ShowsStorageAdapter extends ShowsStoragePort {
  private readonly _cache = new Map<number, Show[]>();

  storeShows(page: number, shows: Show[]): Observable<void> {
    if (this._cache.has(page)) {
      return of(void 0);
    }
    this._cache.set(page, shows);
    return of(void 0);
  }

  getShows(page: number): Observable<Show[] | null> {
    return of(this._cache.get(page) || null);
  }

  clear(): Observable<void> {
    this._cache.clear();
    return of(void 0);
  }
}
