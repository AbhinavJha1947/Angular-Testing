import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, delay, map } from 'rxjs';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="form-container">
      <h2>User Registration Form</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label>Username:</label>
          <input 
            type="text" 
            formControlName="username" 
            data-cy="username-input"
          />
          <div class="error" *ngIf="userForm.get('username')?.invalid && userForm.get('username')?.touched">
            <span *ngIf="userForm.get('username')?.errors?.['required']">Username is required</span>
            <span *ngIf="userForm.get('username')?.errors?.['minlength']">
              Username must be at least 3 characters
            </span>
            <span *ngIf="userForm.get('username')?.errors?.['usernameTaken']">
              Username is already taken
            </span>
          </div>
        </div>

        <div class="form-field">
          <label>Email:</label>
          <input 
            type="email" 
            formControlName="email" 
            data-cy="email-input"
          />
          <div class="error" *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
            <span *ngIf="userForm.get('email')?.errors?.['required']">Email is required</span>
            <span *ngIf="userForm.get('email')?.errors?.['email']">Invalid email format</span>
          </div>
        </div>

        <div class="form-field">
          <label>Age:</label>
          <input 
            type="number" 
            formControlName="age" 
            data-cy="age-input"
          />
          <div class="error" *ngIf="userForm.get('age')?.invalid && userForm.get('age')?.touched">
            <span *ngIf="userForm.get('age')?.errors?.['min']">Age must be at least 18</span>
            <span *ngIf="userForm.get('age')?.errors?.['max']">Age must be less than 100</span>
          </div>
        </div>

        <button 
          type="submit" 
          [disabled]="userForm.invalid || userForm.pending"
          data-cy="submit-btn"
        >
          {{ userForm.pending ? 'Validating...' : 'Submit' }}
        </button>
      </form>

      <div class="form-status" *ngIf="submitted" data-cy="success-message">
        Form submitted successfully!
      </div>
    </div>
  `,
    styles: [`
    .form-container { max-width: 400px; padding: 20px; }
    .form-field { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    .error { color: red; font-size: 12px; margin-top: 5px; }
    button { padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer; }
    button:disabled { background-color: #ccc; cursor: not-allowed; }
    .form-status { margin-top: 20px; padding: 10px; background-color: #d4edda; color: #155724; }
  `]
})
export class UserFormComponent {
    userForm: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder) {
        this.userForm = this.fb.group({
            username: ['',
                [Validators.required, Validators.minLength(3)],
                [this.usernameAsyncValidator.bind(this)]
            ],
            email: ['', [Validators.required, Validators.email]],
            age: ['', [Validators.min(18), Validators.max(100)]]
        });
    }

    // Async validator to check if username is taken
    usernameAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
        const takenUsernames = ['admin', 'test', 'user'];

        return of(control.value).pipe(
            delay(1000), // Simulate API call
            map(username => {
                return takenUsernames.includes(username.toLowerCase())
                    ? { usernameTaken: true }
                    : null;
            })
        );
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            this.submitted = true;
            console.log('Form submitted:', this.userForm.value);
        }
    }
}
