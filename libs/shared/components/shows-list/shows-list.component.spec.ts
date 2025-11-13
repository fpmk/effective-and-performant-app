import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsListComponent } from '@shared/components';
import { ShowsListHarness } from './shows-list.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DialogService } from '@ui/dialog';
import { of } from 'rxjs';

describe('ShowsListComponent', () => {
  let component: ShowsListComponent;
  let fixture: ComponentFixture<ShowsListComponent>;
  let harness: ShowsListHarness;
  let dialog: DialogService;

  beforeEach(async () => {
    const mockCastMembers = [
      { id: 1, name: 'Actor 1', roleName: 'Character 1', realAvatar: '', roleAvatar: '' },
      { id: 2, name: 'Actor 2', roleName: 'Character 2', realAvatar: '', roleAvatar: '' },
    ];

    await TestBed.configureTestingModule({
      imports: [ ShowsListComponent ],
      providers: [
        {
          provide: DialogService,
          useValue: {
            openCastMembers: jest.fn().mockReturnValue(of({})),
          },
        }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShowsListComponent);
    fixture.componentRef.setInput('shows', mockCastMembers);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(DialogService);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, ShowsListHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have show cards', async () => {
    expect(await harness.hasCards()).toBe(true);
  });

  it('should call dialog on showCastMembersEvent', async () => {
    jest.spyOn(dialog, 'openCastMembers');
    await harness.callShowCastMembersEvent();
    expect(dialog.openCastMembers).toHaveBeenCalledTimes(1);
  });
});
