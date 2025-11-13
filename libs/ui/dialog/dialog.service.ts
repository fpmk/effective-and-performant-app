import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CastMembersDialogComponent } from './cast-members-dialog/cast-members-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { Show } from '@domain/show/entity';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly _dialog = inject(Dialog);

  openCastMembers(show: Show): Observable<void> {
    const dialogRef = this._dialog.open<void>(CastMembersDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '80vh',
      panelClass: 'scrollable',
      data: { show },
    });
    return dialogRef.closed;
  }
}
