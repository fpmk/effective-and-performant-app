import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShowsPort } from '@application/show/port';
import { Show } from '@domain/show/entity';

@Injectable({ providedIn: 'root' })
export class SearchShowUseCase {
  private readonly _showsPort = inject(ShowsPort);

  execute(query: string): Observable<Show[]> {
    if (!query) {
      return of([]);
    }
    return this._showsPort.searchShow(query);
  }
}
