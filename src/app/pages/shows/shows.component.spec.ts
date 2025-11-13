import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowsApiAdapter } from '@infrastructure/show/api';
import { ShowsStorageAdapter } from '@infrastructure/show/storage';
import { ShowsPort, ShowsStoragePort } from '@application/show/port';

import { ShowsComponent } from './shows.component';

describe('ShowsComponent', () => {
  let component: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ShowsPort,
          useClass: ShowsApiAdapter
        },
        {
          provide: ShowsStoragePort,
          useClass: ShowsStorageAdapter
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
