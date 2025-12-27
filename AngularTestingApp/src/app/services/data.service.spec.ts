import { DataService } from './data.service';
import { of, throwError } from 'rxjs';

describe('DataService', () => {
    let service: DataService;
    let httpClientSpy: any;

    beforeEach(() => {
        httpClientSpy = {
            get: jest.fn()
        };
        service = new DataService(httpClientSpy as any);
    });

    it('should return expected users (HttpClient called once)', (done) => {
        const expectedUsers = [{ id: 1, name: 'John' }];
        httpClientSpy.get.mockReturnValue(of(expectedUsers));

        service.getUsers().subscribe({
            next: users => {
                expect(users).toEqual(expectedUsers);
                done();
            },
            error: done.fail
        });

        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should return error when the server returns a 404', (done) => {
        const errorResponse = { status: 404, message: 'Not Found' };
        httpClientSpy.get.mockReturnValue(throwError(() => errorResponse));

        service.getUsers().subscribe({
            next: () => done.fail('expected an error, not users'),
            error: error => {
                expect(error.status).toBe(404);
                done();
            }
        });
    });
});
