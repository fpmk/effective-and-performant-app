import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RestApi } from '../../rest.api';
import { ShowsPort } from '@application/show/port';
import { Show } from '@domain/show/entity';
import { mapShowDtoToDomain } from '../mapper/show.mapper';
import { ShowDto } from '../dto/show.dto';
import { mapShowItemDtoToDomain } from '../mapper/show-item.mapper';
import { ShowItemDto } from '../dto/show-item.dto';

@Injectable({ providedIn: 'root' })
export class ShowsApiAdapter extends ShowsPort {
  private readonly _httpClient = inject(HttpClient);

  searchShow(query: string): Observable<Show[]> {
    return this._httpClient.get<ShowDto[]>(RestApi.SEARCH_SHOW, { params: { q: query } }).pipe(
      map((shows: ShowDto[]) => shows.map((show: ShowDto) => mapShowDtoToDomain(show))),
    );
  }

  allShows(page: number): Observable<Show[]> {
    return this._httpClient.get<ShowItemDto[]>(RestApi.SHOWS_LIST, { params: { page } }).pipe(
      map((shows: ShowItemDto[]) => shows.map((show: ShowItemDto) => mapShowItemDtoToDomain(show))),
    );
  }

}
