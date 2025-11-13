import { Route } from '@angular/router';
import { Page } from './app.pages';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: Page.SEARCH_SHOW,
    pathMatch: 'full',
  },
  {
    path: Page.SHOWS,
    loadComponent: () =>
      import('./pages/shows/shows.component').then((m) => m.ShowsComponent),
  },
  {
    path: Page.SEARCH_SHOW,
    loadComponent: () =>
      import('./pages/search-show/search-show.component').then((m) => m.SearchShowComponent),
  },
];
