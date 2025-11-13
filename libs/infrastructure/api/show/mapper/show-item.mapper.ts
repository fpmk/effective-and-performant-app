import { Show } from '@domain/show/entity';
import { ShowItemDto } from '../dto/show-item.dto';

export function mapShowItemDtoToDomain(showDto: ShowItemDto): Show {
  return {
    id: showDto.id,
    rating: showDto.rating?.average ?? 0,
    title: showDto.name,
    image: showDto.image?.medium ?? '',
    date: showDto.premiered ?? '',
    genres: showDto.genres
  }
}
