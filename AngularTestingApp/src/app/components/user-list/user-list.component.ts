import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-list">
      <h3>Users</h3>
      <ul>
        <li *ngFor="let user of users" class="user-item">
          {{ user.name }} 
          <button (click)="removeUser(user.id)" class="delete-btn">Delete</button>
        </li>
      </ul>
      <p *ngIf="users.length === 0" class="no-users">No users available.</p>
    </div>
  `
})
export class UserListComponent {
  @Input() users: any[] = [];
  @Output() deleted = new EventEmitter<number>();

  removeUser(id: number) {
    this.deleted.emit(id);
  }
}
