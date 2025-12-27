import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { By } from '@angular/platform-browser';

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserProfileComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the user name', () => {
        component.name = 'John Doe';
        fixture.detectChanges(); // Trigger change detection

        const nameEl = fixture.debugElement.query(By.css('h1')).nativeElement;
        expect(nameEl.textContent).toContain('John Doe');
    });

    it('should show admin badge when isAdmin is true', () => {
        component.isAdmin = true;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.admin-badge'));
        expect(badgeEl).toBeTruthy();
        expect(badgeEl.nativeElement.textContent).toContain('Administrator');
    });

    it('should NOT show admin badge when isAdmin is false', () => {
        component.isAdmin = false;
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.admin-badge'));
        expect(badgeEl).toBeNull();
    });

    describe('UI Snapshots', () => {
        it('should match snapshot (Standard User)', () => {
            component.name = 'John Doe';
            component.isAdmin = false;
            fixture.detectChanges();

            expect(fixture.nativeElement).toMatchSnapshot();
        });

        it('should match snapshot (Admin User)', () => {
            component.name = 'Admin User';
            component.isAdmin = true;
            fixture.detectChanges();

            expect(fixture.nativeElement).toMatchSnapshot();
        });
    });
});
