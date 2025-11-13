import { Observable } from 'rxjs';
import { CastMember } from '@domain/show/entity';

export abstract class CastMembersPort {
  abstract castMembersByShow(showId: number): Observable<CastMember[]>;
}
