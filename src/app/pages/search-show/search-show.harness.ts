import { ComponentHarness } from '@angular/cdk/testing';

export class SearchShowHarness extends ComponentHarness {
  static hostSelector = 'app-search-show';

  private readonly _header = this.locatorFor('[data-testid="header"]');
  private readonly _searchInput = this.locatorFor('[data-testid="searchInput"]');
  private readonly _clearButton = this.locatorFor('[data-testid="clearButton"]');
  private readonly _showCards = this.locatorForAll('[data-testid="showCard"]');

  async hasHeader(): Promise<boolean> {
    let header = await this._header();
    return !!header;
  }

  async hasSearchInput(): Promise<boolean> {
    let searchEl = await this._searchInput();
    return !!searchEl;
  }

  async hasClearButton(): Promise<boolean> {
    let buttonEl = await this._clearButton();
    return !!buttonEl;
  }

  async searchInputValue(): Promise<string> {
    let searchEl = await this._searchInput();
    return await searchEl.getProperty('value');
  }

  async enterSearchQuery(query: string): Promise<void> {
    let searchEl = await this._searchInput();
    await searchEl.setInputValue(query);
    await searchEl.dispatchEvent('input');
  }

  async clickClearButton(): Promise<void> {
    let buttonEl = await this._clearButton();
    await buttonEl.click();
  }

  async hasShowCards(): Promise<boolean> {
    let cardsEl = await this._showCards();
    return cardsEl.length > 0;
  }

  async showCardsCount(): Promise<number> {
    let cardsEl = await this._showCards();
    return cardsEl.length;
  }
}
