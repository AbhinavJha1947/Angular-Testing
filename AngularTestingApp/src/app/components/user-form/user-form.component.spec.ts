import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
import { By } from '@angular/platform-browser';

describe('UserFormComponent (Reactive Forms Testing)', () => {
    let component: UserFormComponent;
    let fixture: ComponentFixture<UserFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserFormComponent, ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(UserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Form Initialization', () => {
        it('should create form with all controls', () => {
            expect(component.userForm.contains('username')).toBeTruthy();
            expect(component.userForm.contains('email')).toBeTruthy();
            expect(component.userForm.contains('age')).toBeTruthy();
        });

        it('should initialize with empty values', () => {
            expect(component.userForm.get('username')?.value).toBe('');
            expect(component.userForm.get('email')?.value).toBe('');
            expect(component.userForm.get('age')?.value).toBe('');
        });

        it('should be invalid when empty', () => {
            expect(component.userForm.valid).toBeFalsy();
        });
    });

    describe('Username Validation', () => {
        it('should be invalid when empty', () => {
            const usernameControl = component.userForm.get('username');
            expect(usernameControl?.hasError('required')).toBeTruthy();
        });

        it('should be invalid when too short', () => {
            const usernameControl = component.userForm.get('username');
            usernameControl?.setValue('ab');
            expect(usernameControl?.hasError('minlength')).toBeTruthy();
        });

        it('should be valid with correct length', fakeAsync(() => {
            const usernameControl = component.userForm.get('username');
            usernameControl?.setValue('validuser');

            // Wait for async validator
            tick(1000);

            expect(usernameControl?.valid).toBeTruthy();
        }));

        it('should fail async validation for taken username', fakeAsync(() => {
            const usernameControl = component.userForm.get('username');
            usernameControl?.setValue('admin');

            // Wait for async validator (1000ms)
            tick(1000);

            expect(usernameControl?.hasError('usernameTaken')).toBeTruthy();
            expect(usernameControl?.valid).toBeFalsy();
        }));

        it('should show pending state during async validation', fakeAsync(() => {
            const usernameControl = component.userForm.get('username');
            usernameControl?.setValue('newuser');

            // Immediately check - should be pending
            expect(usernameControl?.pending).toBeTruthy();

            // Complete async validation
            tick(1000);

            expect(usernameControl?.pending).toBeFalsy();
        }));
    });

    describe('Email Validation', () => {
        it('should be invalid when empty', () => {
            const emailControl = component.userForm.get('email');
            expect(emailControl?.hasError('required')).toBeTruthy();
        });

        it('should be invalid with wrong format', () => {
            const emailControl = component.userForm.get('email');
            emailControl?.setValue('invalid-email');
            expect(emailControl?.hasError('email')).toBeTruthy();
        });

        it('should be valid with correct format', () => {
            const emailControl = component.userForm.get('email');
            emailControl?.setValue('test@example.com');
            expect(emailControl?.hasError('email')).toBeFalsy();
        });
    });

    describe('Age Validation', () => {
        it('should be invalid when under 18', () => {
            const ageControl = component.userForm.get('age');
            ageControl?.setValue(17);
            expect(ageControl?.hasError('min')).toBeTruthy();
        });

        it('should be invalid when over 100', () => {
            const ageControl = component.userForm.get('age');
            ageControl?.setValue(101);
            expect(ageControl?.hasError('max')).toBeTruthy();
        });

        it('should be valid with age between 18-100', () => {
            const ageControl = component.userForm.get('age');
            ageControl?.setValue(25);
            expect(ageControl?.valid).toBeTruthy();
        });
    });

    describe('Form Submission', () => {
        it('should not submit when form is invalid', () => {
            const submitSpy = jest.spyOn(component, 'onSubmit');
            const submitBtn = fixture.debugElement.query(By.css('[data-cy=submit-btn]'));

            expect(component.userForm.invalid).toBeTruthy();
            expect(submitBtn.nativeElement.disabled).toBeTruthy();

            submitBtn.nativeElement.click();
            expect(component.submitted).toBeFalsy();
        });

        it('should submit when form is valid', fakeAsync(() => {
            // Fill out valid form
            component.userForm.patchValue({
                username: 'validuser',
                email: 'test@example.com',
                age: 25
            });

            // Wait for async validation
            tick(1000);

            expect(component.userForm.valid).toBeTruthy();

            component.onSubmit();

            expect(component.submitted).toBeTruthy();
        }));

        it('should show success message after submission', fakeAsync(() => {
            component.userForm.patchValue({
                username: 'validuser',
                email: 'test@example.com',
                age: 25
            });

            tick(1000);

            component.onSubmit();
            fixture.detectChanges();

            const successMessage = fixture.debugElement.query(By.css('[data-cy=success-message]'));
            expect(successMessage).toBeTruthy();
            expect(successMessage.nativeElement.textContent).toContain('submitted successfully');
        }));
    });

    describe('Form Control Interaction', () => {
        it('should update value when user types', () => {
            const usernameInput = fixture.debugElement.query(By.css('[data-cy=username-input]')).nativeElement;

            usernameInput.value = 'testuser';
            usernameInput.dispatchEvent(new Event('input'));

            expect(component.userForm.get('username')?.value).toBe('testuser');
        });

        it('should mark field as touched on blur', () => {
            const usernameControl = component.userForm.get('username');
            const usernameInput = fixture.debugElement.query(By.css('[data-cy=username-input]')).nativeElement;

            expect(usernameControl?.touched).toBeFalsy();

            usernameInput.dispatchEvent(new Event('blur'));

            expect(usernameControl?.touched).toBeTruthy();
        });
    });
});
