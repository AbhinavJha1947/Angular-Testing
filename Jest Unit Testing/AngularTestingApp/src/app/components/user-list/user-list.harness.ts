import { ComponentHarness } from '@angular/cdk/testing';

export class UserListHarness extends ComponentHarness {
  static hostSelector = 'app-user-list';

  private _userItems = this.locatorForAll('.user-item');
  private _noUsersMsg = this.locatorForOptional('.no-users');

  async getUserCount(): Promise<number> {
    return (await this._userItems()).length;
  }

  async getNoUsersMessage(): Promise<string | null> {
    const msg = await this._noUsersMsg();
    return msg ? msg.text() : null;
  }

  async deleteUser(index: number): Promise<void> {
    const items = await this._userItems();
    if (items[index]) {
      const btn = await items[index].locatorFor('.delete-btn')();
      await btn.click();
    }
  }
}
