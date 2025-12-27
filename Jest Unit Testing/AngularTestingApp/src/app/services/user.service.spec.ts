import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService (HttpClientTestingModule)', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
    const apiUrl = 'https://api.example.com/users';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // Verify that no unmatched requests are outstanding
        httpMock.verify();
    });

    describe('getUsers', () => {
        it('should return an array of users', () => {
            const mockUsers: User[] = [
                { id: 1, name: 'Alice', email: 'alice@test.com' },
                { id: 2, name: 'Bob', email: 'bob@test.com' }
            ];

            service.getUsers().subscribe(users => {
                expect(users.length).toBe(2);
                expect(users).toEqual(mockUsers);
            });

            // Expect one request to the API
            const req = httpMock.expectOne(apiUrl);
            expect(req.request.method).toBe('GET');

            // Respond with mock data
            req.flush(mockUsers);
        });

        it('should handle error when API fails', () => {
            service.getUsers().subscribe({
                next: () => fail('should have failed with 500 error'),
                error: (error) => {
                    expect(error.message).toBe('Failed to fetch users');
                }
            });

            const req = httpMock.expectOne(apiUrl);
            req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
        });
    });

    describe('getUserById', () => {
        it('should return a single user', () => {
            const mockUser: User = { id: 1, name: 'Alice', email: 'alice@test.com' };

            service.getUserById(1).subscribe(user => {
                expect(user).toEqual(mockUser);
            });

            const req = httpMock.expectOne(`${apiUrl}/1`);
            expect(req.request.method).toBe('GET');
            req.flush(mockUser);
        });

        it('should handle 404 error', () => {
            service.getUserById(999).subscribe({
                next: () => fail('should have failed with 404 error'),
                error: (error) => {
                    expect(error.message).toBe('User 999 not found');
                }
            });

            const req = httpMock.expectOne(`${apiUrl}/999`);
            req.flush('Not Found', { status: 404, statusText: 'Not Found' });
        });
    });

    describe('createUser', () => {
        it('should create a new user', () => {
            const newUser = { name: 'Charlie', email: 'charlie@test.com' };
            const createdUser: User = { id: 3, ...newUser };

            service.createUser(newUser).subscribe(user => {
                expect(user).toEqual(createdUser);
            });

            const req = httpMock.expectOne(apiUrl);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(newUser);
            req.flush(createdUser);
        });
    });

    describe('updateUser', () => {
        it('should update an existing user', () => {
            const updatedData = { name: 'Alice Updated' };
            const updatedUser: User = { id: 1, name: 'Alice Updated', email: 'alice@test.com' };

            service.updateUser(1, updatedData).subscribe(user => {
                expect(user).toEqual(updatedUser);
            });

            const req = httpMock.expectOne(`${apiUrl}/1`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(updatedData);
            req.flush(updatedUser);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', () => {
            service.deleteUser(1).subscribe(response => {
                expect(response).toBeUndefined();
            });

            const req = httpMock.expectOne(`${apiUrl}/1`);
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });
    });
});
