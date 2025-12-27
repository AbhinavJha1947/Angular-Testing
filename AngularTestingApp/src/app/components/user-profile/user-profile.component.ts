import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-profile">
      <h1>{{ name }}</h1>
      <p *ngIf="isAdmin" class="admin-badge">Administrator</p>
    </div>
  `,
  styles: [`
    .user-profile { border: 1px solid #ccc; padding: 10px; border-radius: 4px; }
    .admin-badge { color: red; font-weight: bold; }
  `]
})
export class UserProfileComponent {
  @Input() name: string = '';
  @Input() isAdmin: boolean = false;
}
