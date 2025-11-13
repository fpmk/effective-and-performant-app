import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMemberComponent } from '@ui/cast';
import { CastMemberHarness } from './cast-member.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('CastMemberComponent', () => {
  let component: CastMemberComponent;
  let fixture: ComponentFixture<CastMemberComponent>;
  let harness: CastMemberHarness;
  const member = { id: 1, name: 'Actor 1', roleName: 'Character 1', realAvatar: '', roleAvatar: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CastMemberComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CastMemberComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('member', member);
    fixture.detectChanges();
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, CastMemberHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have real avatar', async () => {
    expect(await harness.hasRealAvatar()).toBe(true);
  });

  it('should have role avatar', async () => {
    expect(await harness.hasRoleAvatar()).toBe(true);
  });

  it('should have real name', async () => {
    expect(await harness.hasRealName()).toBe(true);
  });

  it('should have role name', async () => {
    expect(await harness.hasRoleName()).toBe(true);
  });
});
