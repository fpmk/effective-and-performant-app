import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ShowsFacade } from './shows.facade';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowsListComponent } from '@shared/components';
import { tap } from 'rxjs';

@Component({
  selector: 'app-shows',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    ShowsListComponent,
  ],
  providers: [
    ShowsFacade,
  ],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowsComponent {
  private readonly _showsFacade = inject(ShowsFacade);

  protected loading = signal<boolean>(false);
  protected shows$ = this._showsFacade.shows$.pipe(tap(() => this.loading.set(false)));

  loadMore() {
    console.log('Loading...');
    if (this.loading()) return;
    this.loading.set(true);
    this._showsFacade.loadMoreShows();
  }
}
