import { CastMember } from './actor.entity';

export class Show {
  constructor(public id: number,
              public image: string,
              public title: string,
              public rating: number,
              public date: string,
              public genres: string[], // if genres are limited, we can use type Genre = 'Drama' | 'Romance' | ...
              public actors?: CastMember[]) {
  }

// think about validation or other entity relation methods if needed
}
