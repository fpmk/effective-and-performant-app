import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SearchShowFacade } from './search-show.facade';
import { ShowsListComponent } from '@shared/components';

@Component({
  selector: 'app-search-show',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    ShowsListComponent
  ],
  providers: [
    SearchShowFacade
  ],
  templateUrl: './search-show.component.html',
  styleUrl: './search-show.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchShowComponent {
  private readonly _searchShowFacade = inject(SearchShowFacade);
  private readonly latestQuery = this._searchShowFacade.latestQuery();
  private readonly latestQueryValue = toSignal(this.latestQuery, { initialValue: '' })();
  protected readonly searchFormControl = new FormControl(this.latestQueryValue);
  protected readonly shows$ = this.searchFormControl.valueChanges.pipe(
    startWith(this.latestQueryValue),
    distinctUntilChanged(),
    debounceTime(300),
    switchMap((query: string | null) => {
      if (!query) {
        return of([]);
      }
      if (query === this.latestQueryValue) {
        return this._searchShowFacade.foundShows();
      }
      return this._searchShowFacade.searchShows(query ?? '')
    }),
    catchError((error) => {
      console.error('Failed to load shows:', error);  // do something, maybe show toast, or message
      return of([]);
    }),
    takeUntilDestroyed()
  );

  clearSearch() {
    this.searchFormControl.reset();
    this._searchShowFacade.clearFoundShows();
  }
}
