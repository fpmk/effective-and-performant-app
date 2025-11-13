import { Show } from '@domain/show/entity';
import { ShowDto } from '../dto/show.dto';

export function mapShowDtoToDomain(showDto: ShowDto): Show {
  return {
    id: showDto.show?.id,
    rating: showDto.show?.rating?.average ?? 0,
    title: showDto.show?.name,
    image: showDto.show?.image?.medium ?? '',
    date: showDto.show?.premiered ?? '',
    genres: showDto.show?.genres
  }
}
