import { ComponentHarness } from '@angular/cdk/testing';

export class ShowsListHarness extends ComponentHarness {
  static hostSelector = 'app-shows-list';

  private readonly _showCard = this.locatorForAll('[data-testid="showCard"]');

  async hasCards(): Promise<boolean> {
    let cards = await this._showCard();
    return !!cards.length;
  }

  async callShowCastMembersEvent(): Promise<void> {
    let cards = await this._showCard();
    await cards[ 0 ].dispatchEvent('showCastMembersEvent');
  }
}
