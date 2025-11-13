import { ComponentHarness } from '@angular/cdk/testing';

export class CastMembersDialogHarness extends ComponentHarness {
  static hostSelector = 'app-cast-members-dialog';

  private readonly _castMembers = this.locatorForAll('app-cast-member');
  private readonly _loading = this.locatorForAll('[data-testid="loading"]');
  private readonly _empty = this.locatorForAll('[data-testid="empty"]');
  private readonly _loadingText = this.locatorForOptional('[data-testid="loading"]');

  async hasCastMembers(): Promise<boolean> {
    let members = await this._castMembers();
    return !!members.length;
  }

  async isLoading(): Promise<boolean> {
    let testElements = await this._loading();
    return !!testElements;
  }

  async isEmpty(): Promise<boolean> {
    let testElements = await this._empty();
    return !!testElements;
  }


  async isLoadingVisible(): Promise<boolean> {
    const loading = await this._loadingText();
    return loading !== null && (await loading.text()) === 'Loading...';
  }

  async getCastMembersCount(): Promise<number> {
    const members = await this._castMembers();
    return members.length;
  }

  async areCastMembersVisible(): Promise<boolean> {
    return (await this.getCastMembersCount()) > 0;
  }
}
