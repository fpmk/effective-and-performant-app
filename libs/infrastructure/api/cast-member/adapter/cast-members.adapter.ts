import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RestApi } from '../../rest.api';
import { CastMember } from '@domain/show/entity';
import { CastMembersPort } from '@application/cast-member/port';
import { CastMemberDto } from '../dto/cast-member.dto';
import { mapCastMemberDtoToDomain } from '../mapper/cast-member.mapper';

@Injectable({ providedIn: 'root' })
export class CastMembersAdapter extends CastMembersPort {
  private readonly _httpClient = inject(HttpClient);

  castMembersByShow(showId: number): Observable<CastMember[]> {
    return this._httpClient.get<CastMemberDto[]>(RestApi.SHOW_CAST(showId)).pipe(
      map((shows: CastMemberDto[]) => shows.map((show: CastMemberDto) => mapCastMemberDtoToDomain(show))),
    );
  }
}
