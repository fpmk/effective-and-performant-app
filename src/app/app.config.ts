import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpErrorInterceptor } from '@infrastructure/http';
import { SearchShowsStoragePort, ShowsPort, ShowsStoragePort } from '@application/show/port';
import { SearchShowsStorageAdapter, ShowsStorageAdapter } from '@infrastructure/show/storage';
import { ShowsApiAdapter } from '@infrastructure/show/api';
import { CastMembersPort } from '@application/cast-member/port';
import { CastMembersAdapter } from '@infrastructure/cast-member/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: ShowsPort,
      useClass: ShowsApiAdapter
    },
    {
      provide: ShowsStoragePort,
      useClass: ShowsStorageAdapter
    },
    {
      provide: SearchShowsStoragePort,
      useClass: SearchShowsStorageAdapter
    },
    {
      provide: CastMembersPort,
      useClass: CastMembersAdapter
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
};
