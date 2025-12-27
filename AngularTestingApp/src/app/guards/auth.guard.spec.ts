import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard (Router Guard Testing)', () => {
    let guard: AuthGuard;
    let authService: AuthService;
    let router: Router;
    let routerSpy: jest.SpyInstance;

    beforeEach(() => {
        const mockRouter = {
            createUrlTree: jest.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                AuthService,
                { provide: Router, useValue: mockRouter }
            ]
        });

        guard = TestBed.inject(AuthGuard);
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        routerSpy = jest.spyOn(router, 'createUrlTree');
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    describe('canActivate', () => {
        let mockRoute: ActivatedRouteSnapshot;
        let mockState: RouterStateSnapshot;

        beforeEach(() => {
            mockRoute = {} as ActivatedRouteSnapshot;
            mockState = { url: '/dashboard' } as RouterStateSnapshot;
        });

        it('should allow access when user is authenticated', () => {
            // Arrange: Set user as authenticated
            jest.spyOn(authService, 'isLoggedIn').mockReturnValue(true);

            // Act
            const result = guard.canActivate(mockRoute, mockState);

            // Assert
            expect(result).toBe(true);
            expect(routerSpy).not.toHaveBeenCalled();
        });

        it('should redirect to login when user is not authenticated', () => {
            // Arrange: Set user as NOT authenticated
            jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);
            const mockUrlTree = {} as UrlTree;
            routerSpy.mockReturnValue(mockUrlTree);

            // Act
            const result = guard.canActivate(mockRoute, mockState);

            // Assert
            expect(result).toBe(mockUrlTree);
            expect(routerSpy).toHaveBeenCalledWith(['/login'], {
                queryParams: { returnUrl: '/dashboard' }
            });
        });

        it('should include the attempted URL in query params', () => {
            jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);
            mockState.url = '/admin/settings';

            guard.canActivate(mockRoute, mockState);

            expect(routerSpy).toHaveBeenCalledWith(['/login'], {
                queryParams: { returnUrl: '/admin/settings' }
            });
        });
    });

    describe('Integration with AuthService', () => {
        let mockRoute: ActivatedRouteSnapshot;
        let mockState: RouterStateSnapshot;

        beforeEach(() => {
            mockRoute = {} as ActivatedRouteSnapshot;
            mockState = { url: '/protected' } as RouterStateSnapshot;
        });

        it('should allow access after successful login', () => {
            // Initially not authenticated
            expect(guard.canActivate(mockRoute, mockState)).not.toBe(true);

            // User logs in
            authService.login('admin', 'password');

            // Now should allow access
            expect(guard.canActivate(mockRoute, mockState)).toBe(true);
        });

        it('should deny access after logout', () => {
            // User logs in
            authService.login('admin', 'password');
            expect(guard.canActivate(mockRoute, mockState)).toBe(true);

            // User logs out
            authService.logout();

            // Should now deny access
            expect(guard.canActivate(mockRoute, mockState)).not.toBe(true);
        });
    });
});
