import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GetCastMembersUseCase } from '@application/cast-member/usecase';
import { catchError, Observable, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CastMember, Show } from '@domain/show/entity';
import { AsyncPipe } from '@angular/common';
import { CastMemberComponent } from '@ui/cast';

@Component({
  selector: 'app-cast-members-dialog',
  imports: [
    AsyncPipe,
    CastMemberComponent
  ],
  templateUrl: './cast-members-dialog.component.html',
  styleUrl: './cast-members-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CastMembersDialogComponent implements OnInit {
  private readonly _getCastMembersUseCase = inject(GetCastMembersUseCase);
  private readonly _data = inject<{ show: Show }>(DIALOG_DATA);
  private readonly _destroyRef = inject(DestroyRef);

  protected loading = signal<boolean>(false);
  protected members$!: Observable<CastMember[]>;

  constructor() {
  }

  ngOnInit() {
    this.loading.set(true)
    this.members$ = this._getCastMembersUseCase.execute(this._data.show).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        console.error('Failed to load cast:', error); // do something, maybe show toast, or message
        this.loading.set(false);
        return of([]);
      }),
      takeUntilDestroyed(this._destroyRef)
    );
  }
}
