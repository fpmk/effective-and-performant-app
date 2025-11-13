import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output, ViewChild } from '@angular/core';
import { ShowCardComponent } from '@ui/show';
import { Show } from '@domain/show/entity';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DialogService } from '@ui/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shows-list',
  imports: [
    ShowCardComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf
  ],
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowsListComponent {
  shows = input.required<Show[]>();
  empty = input<boolean>(true);
  loading = input<boolean>(false);
  endReached = output<void>();

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  private _viewport!: CdkVirtualScrollViewport;

  private readonly _dialog = inject(DialogService);
  private readonly _destroyRef = inject(DestroyRef);

  showCaseMembers($event: Show) {
    this._dialog.openCastMembers($event).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }

  onScroll() {
    if (this.loading()) return;
    const end = this._viewport.getRenderedRange().end;
    const total = this._viewport.getDataLength();
    if (end >= total - 10 && end > 0 && total > 0) {
      this.endReached.emit();
    }
  }
}
