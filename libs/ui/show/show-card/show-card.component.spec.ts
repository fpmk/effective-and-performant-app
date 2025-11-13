import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCardComponent } from '@ui/show';
import { Show } from '@domain/show/entity';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ShowCardHarness } from './show-card.harness';
import { GetCastMembersUseCase } from '@application/cast-member/usecase';
import { CastMembersPort } from '@application/cast-member/port';

describe('ShowCardComponent', () => {
  let component: ShowCardComponent;
  let fixture: ComponentFixture<ShowCardComponent>;
  let showMock: Show;
  let harness: ShowCardHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ShowCardComponent ],
      providers: [
        GetCastMembersUseCase,
        CastMembersPort
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowCardComponent);
    component = fixture.componentInstance;
    showMock = {
      id: 1,
      title: 'Test show',
      rating: 8,
      genres: [ 'Drama' ],
      date: '2021-10-10',
      image: ''
    };
    fixture.componentRef.setInput('show', showMock);
    fixture.detectChanges();
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ShowCardHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Show card', () => {
    it('should have a title', async () => {
      expect(await harness.getTitle()).toBe('Test show');
    });

    it('should have a rating', async () => {
      expect(await harness.getRating()).toBe('Rating: 8');
    });

    it('should have no rating', async () => {
      const mock = { ...showMock, rating: 0 };
      fixture.componentRef.setInput('show', mock);
      fixture.detectChanges();
      expect(await harness.getRating()).toBe('No rating');
    });

    it('should have a date', async () => {
      expect(await harness.getDate()).toBe('2021-10-10');
    });

    it('should have a poster', async () => {
      expect(await harness.hasPoster()).toBeTruthy();
    });
  });

  describe('Cast member', () => {
    it('should show cast members button initially', async () => {
      expect(await harness.isShowCastLinkVisible()).toBeTruthy();
    });
  });
});
