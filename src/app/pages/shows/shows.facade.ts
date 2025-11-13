import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Show } from '@domain/show/entity';
import { map, merge, Observable, scan, shareReplay, Subject, switchMap } from 'rxjs';
import { GetAllShowsUseCase } from '@application/show/usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class ShowsFacade {
  private readonly _allShowUseCase = inject(GetAllShowsUseCase);
  private readonly _page = signal<number>(0); // using number because API not providing limit, offset => no need to make Page type
  private readonly _destroyRef = inject(DestroyRef);

  private _moreShows = new Subject<void>();

  private _shows$: Observable<Show[]> = merge(
    this.getInitialShows().pipe(
      map(shows => ({ shows, isInitial: true }))
    ), this._moreShows.pipe(
      switchMap(() =>
        this.loadMore().pipe(
          map(shows => ({ shows, isInitial: false }))
        )
      )
    ),
  ).pipe(
    scan((acc, curr: { shows: Show[], isInitial: boolean }) => {
      if (curr.isInitial) return curr.shows;
      return [ ...acc, ...curr.shows ];
    }, [] as Show[]),
    shareReplay(1),
    takeUntilDestroyed(this._destroyRef)
  );

  private getInitialShows(): Observable<Show[]> {
    return this._allShowUseCase.execute(this._page());
  }

  private loadMore(): Observable<Show[]> {
    this._page.update(page => page + 1);
    return this._allShowUseCase.execute(this._page());
  }

  get shows$(): Observable<Show[]> {
    return this._shows$;
  }

  loadMoreShows() {
    this._moreShows.next();
  }
}
