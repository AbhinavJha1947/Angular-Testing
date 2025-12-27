import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for *ngIf if used, though this concise template might not strictly need it.
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true, // Mark as standalone
    imports: [CommonModule, FormsModule],
    template: `
    <div class="login-container">
      <h2>Login</h2>
      <input type="text" [(ngModel)]="username" placeholder="Username" data-cy="username" />
      <input type="password" [(ngModel)]="password" placeholder="Password" data-cy="password" />
      <button (click)="login()" data-cy="submit-btn" [disabled]="!username || !password">Login</button>
      <p *ngIf="message" data-cy="message">{{ message }}</p>
    </div>
  `,
    styles: [`
    .login-container { max-width: 300px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background-color: #ccc; }
  `]
})
export class LoginComponent {
    username = '';
    password = '';
    message = '';

    login() {
        if (this.username === 'admin' && this.password === '1234') {
            this.message = 'Login Successful!';
        } else {
            this.message = 'Invalid Credentials';
        }
    }
}
