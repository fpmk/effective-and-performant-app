import { inject, Injectable } from '@angular/core';
import { SearchShowsStoragePort } from '@application/show/port';
import { Show } from '@domain/show/entity';
import { Observable, tap } from 'rxjs';
import { SearchShowUseCase } from '@application/show/usecase';

@Injectable()
export class SearchShowFacade {
  private readonly _searchShowUseCase = inject(SearchShowUseCase);
  private readonly _showsStorage = inject(SearchShowsStoragePort);

  searchShows(query: string): Observable<Show[]> {
    this.saveQuery(query);
    return this._searchShowUseCase.execute(query).pipe(tap(shows => this.saveFoundShows(shows)));
  }

  latestQuery(): Observable<string> {
    return this._showsStorage.getLatestQuery();
  }

  foundShows(): Observable<Show[]> {
    return this._showsStorage.getLatestFoundShows();
  }

  clearFoundShows(): void {
    this._showsStorage.clear();
  }

  private saveQuery(query: string): void {
    this._showsStorage.storeLatestQuery(query);
  }

  private saveFoundShows(shows: Show[]): void {
    this._showsStorage.storeLatestFoundShows(shows);
  }

}
