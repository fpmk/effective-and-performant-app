import { ComponentHarness } from '@angular/cdk/testing';

export class ShowCardHarness extends ComponentHarness {
  static hostSelector = 'app-show-card';

  private readonly _img = this.locatorFor('[data-testid="poster"]');
  private readonly _rating = this.locatorFor('[data-testid="rating"]');
  private readonly _title = this.locatorFor('[data-testid="title"]');
  private readonly _date = this.locatorFor('[data-testid="date"]');
  private readonly _showCastLink = this.locatorForOptional('[data-testid="showCastLink"]');

  async hasPoster(): Promise<boolean> {
    let img = await this._img();
    return !!img;
  }

  async getRating(): Promise<string> {
    let el = await this._rating();
    return el.text();
  }

  async getTitle(): Promise<string> {
    let el = await this._title();
    return el.text();
  }

  async getDate(): Promise<string> {
    let el = await this._date();
    return el.text();
  }

  async clickShowCast(): Promise<void> {
    const button = await this._showCastLink();
    if (button) {
      return button.click();
    }
    throw new Error('Show cast link not found');
  }

  async isShowCastLinkVisible(): Promise<boolean> {
    const link = await this._showCastLink();
    return link !== null;
  }

}
