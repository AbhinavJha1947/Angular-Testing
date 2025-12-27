import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserListHarness } from './user-list.harness';

describe('UserListComponent (Integration with Harness)', () => {
  async function setup(users: any[] = []) {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserListComponent);
    const component = fixture.componentInstance;
    component.users = users;
    fixture.detectChanges();

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const harness = await loader.getHarness(UserListHarness);

    return { fixture, component, harness };
  }

  it('should display the correct number of users', async () => {
    const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const { harness } = await setup(users);

    expect(await harness.getUserCount()).toBe(2);
  });

  it('should show empty message when no users', async () => {
    const { harness } = await setup([]);

    expect(await harness.getNoUsersMessage()).toBe('No users available.');
  });

  it('should emit deleted event when delete button clicked', async () => {
    const users = [{ id: 1, name: 'Alice' }];
    const { component, harness } = await setup(users);

    const spy = jest.spyOn(component.deleted, 'emit');
    await harness.deleteUser(0);

    expect(spy).toHaveBeenCalledWith(1);
  });
});
