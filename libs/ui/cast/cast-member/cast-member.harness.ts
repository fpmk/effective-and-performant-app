import { ComponentHarness } from '@angular/cdk/testing';

export class CastMemberHarness extends ComponentHarness {
  static hostSelector = 'app-cast-member';

  private readonly _realAvatar = this.locatorFor('[data-testid="realAvatar"]');
  private readonly _realName = this.locatorFor('[data-testid="realName"]');
  private readonly _roleAvatar = this.locatorFor('[data-testid="roleAvatar"]');
  private readonly _roleName = this.locatorFor('[data-testid="roleName"]');

  async hasRealAvatar(): Promise<boolean> {
    let element = await this._realAvatar();
    return !!element;
  }

  async hasRealName(): Promise<boolean> {
    let element = await this._realName();
    return !!element;
  }

  async hasRoleAvatar(): Promise<boolean> {
    let element = await this._roleAvatar();
    return !!element;
  }

  async hasRoleName(): Promise<boolean> {
    let element = await this._roleName();
    return !!element;
  }
}
