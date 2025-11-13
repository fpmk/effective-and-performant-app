import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMembersDialogComponent } from './cast-members-dialog.component';
import { provideHttpClient } from '@angular/common/http';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CastMembersDialogHarness } from './cast-members-dialog.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { GetCastMembersUseCase } from '@application/cast-member/usecase';
import { of } from 'rxjs';

describe('BaseDialogComponent', () => {
  let component: CastMembersDialogComponent;
  let fixture: ComponentFixture<CastMembersDialogComponent>;
  let harness: CastMembersDialogHarness;
  const useCaseMock = {
    execute: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(async () => {
    const member = { id: 1, name: 'Actor 1', roleName: 'Character 1', realAvatar: '', roleAvatar: '' };
    useCaseMock.execute.mockReturnValue(of([ member, member ]));
    await TestBed.configureTestingModule({
      imports: [ CastMembersDialogComponent ],
      providers: [
        provideHttpClient(),
        {
          provide: DIALOG_DATA,
          useValue: {
            show: { id: 1 }
          }
        },
        {
          provide: GetCastMembersUseCase,
          useValue: useCaseMock,
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CastMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, CastMembersDialogHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show cast members', async () => {
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(await harness.hasCastMembers()).toBe(true);
  });

  it('should show loading', async () => {
    component[ 'loading' ].set(true);
    expect(await harness.isLoading()).toBe(true);
  });

  it('should call GetCastMembersUseCase', async () => {
    useCaseMock.execute.mockClear();
    component.ngOnInit();
    expect(component[ 'loading' ]()).toBe(true);
    expect(useCaseMock.execute).toHaveBeenCalledTimes(1);
  });

  it('should show cast members after loading', async () => {
    useCaseMock.execute.mockClear();

    expect(await harness.getCastMembersCount()).toBe(2);
    expect(await harness.isLoadingVisible()).toBeFalsy();
  });

});
