import { inject, Injectable } from '@angular/core';
import { CastMember, Show } from '@domain/show/entity';
import { CastMembersPort } from '@application/cast-member/port';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetCastMembersUseCase {
  private readonly _castMembersPort = inject(CastMembersPort);

  execute(show: Show): Observable<CastMember[]> {
    return this._castMembersPort.castMembersByShow(show.id);
  }
}
