export class RestApi {
  public static readonly BASE_URL = 'https://api.tvmaze.com';

  public static readonly SEARCH_SHOW = `${ RestApi.BASE_URL }/search/shows`;
  public static readonly SHOWS_LIST = `${ RestApi.BASE_URL }/shows`;

  public static SHOW_CAST(showId: number) {
    return `${ RestApi.SHOWS_LIST }/${ showId }/cast`;
  }
}
