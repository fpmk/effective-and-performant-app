import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { ShowsApiAdapter } from '@infrastructure/show/api';
import { SearchShowsStorageAdapter } from '@infrastructure/show/storage';
import { SearchShowsStoragePort, ShowsPort } from '@application/show/port';

import { SearchShowComponent } from './search-show.component';
import { SearchShowHarness } from './search-show.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SearchShowFacade } from './search-show.facade';

describe('SearchShowComponent', () => {
  let component: SearchShowComponent;
  let fixture: ComponentFixture<SearchShowComponent>;
  let harness: SearchShowHarness;
  let searchShowsSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SearchShowComponent ],
      providers: [
        provideHttpClient(),
        {
          provide: ShowsPort,
          useClass: ShowsApiAdapter
        },
        {
          provide: SearchShowsStoragePort,
          useClass: SearchShowsStorageAdapter
        }
      ]
    })
      .compileComponents();

    const storage = TestBed.inject(SearchShowsStoragePort);
    storage.storeLatestQuery('test').subscribe();

    fixture = TestBed.createComponent(SearchShowComponent);
    component = fixture.componentInstance;

    const facade = fixture.debugElement.injector.get(SearchShowFacade);
    searchShowsSpy = jest.spyOn(facade, 'searchShows').mockReturnValue(of([]));

    fixture.detectChanges();

    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, SearchShowHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header', async () => {
    expect(await harness.hasHeader()).toBe(true);
  });

  it('should have search input field', async () => {
    expect(await harness.hasSearchInput()).toBe(true);
  });

  it('should have clear button', async () => {
    expect(await harness.hasClearButton()).toBe(true);
  });

  it('should initialize search form control with latest query', fakeAsync(() => {
    tick(100);
    fixture.detectChanges();
    harness.searchInputValue().then(value => {
      expect(value).toBe('test');
    });
    flushMicrotasks();
  }));

  it('should debounce search input changes', fakeAsync(() => {
    searchShowsSpy.mockClear();

    harness.enterSearchQuery('q');
    fixture.detectChanges();

    tick(10);
    expect(searchShowsSpy).not.toHaveBeenCalled();

    harness.enterSearchQuery('query');
    tick(300);
    fixture.detectChanges();
    expect(searchShowsSpy).toHaveBeenCalledWith('query');

    flushMicrotasks();
  }));
});
