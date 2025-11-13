import { CastMemberDto } from '../dto/cast-member.dto';
import { CastMember } from '@domain/show/entity';

export function mapCastMemberDtoToDomain(castMemberDto: CastMemberDto): CastMember {
  return {
    id: castMemberDto.person.id,
    name: castMemberDto.person.name,
    roleName: castMemberDto.character.name,
    birthday: castMemberDto.person.birthday ?? '',
    realAvatar: castMemberDto.person.image?.medium ?? '',
    roleAvatar: castMemberDto.character.image?.medium ?? '',
  }
}
