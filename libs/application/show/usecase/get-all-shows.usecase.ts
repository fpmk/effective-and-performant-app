import { inject, Injectable } from '@angular/core';
import { Show } from '@domain/show/entity';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ShowsPort } from '@application/show/port';
import { ShowsStorageAdapter } from '@infrastructure/show/storage';

@Injectable({ providedIn: 'root' })
export class GetAllShowsUseCase {
  private readonly _showsPort = inject(ShowsPort);
  private readonly _showsStorage = inject(ShowsStorageAdapter);

  execute(page: number): Observable<Show[]> {
    this.validate(page);
    return this._showsStorage.getShows(page)
      .pipe(
        switchMap((shows: Show[] | null) => {
          if (shows === null) {
            return this._showsPort.allShows(page).pipe(tap((shows: Show[]) => this._showsStorage.storeShows(page, shows)));
          }
          return of(shows);
        })
      );
  }

  private validate(page: number) {
    if (page < 0) {
      throw new Error('Page doesn\'t exist');
    }
  }
}
