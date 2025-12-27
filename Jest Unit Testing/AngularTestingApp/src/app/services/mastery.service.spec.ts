import { TestScheduler } from 'rxjs/testing';
import { RxjsMasteryService } from './mastery.service';
import { of, throwError } from 'rxjs';

describe('RxjsMasteryService (Marble Testing)', () => {
    let service: RxjsMasteryService;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        service = new RxjsMasteryService();
        // Initialize TestScheduler with a custom assertion
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    describe('multiplyBy', () => {
        it('should multiply values correctly', () => {
            testScheduler.run(({ cold, expectObservable }) => {
                const input$ = cold('-a-b-c|', { a: 1, b: 2, c: 3 });
                const expected = '-x-y-z|';
                const result$ = service.multiplyBy(input$, 10);

                expectObservable(result$).toBe(expected, { x: 10, y: 20, z: 30 });
            });
        });
    });

    describe('search', () => {
        it('should debounce and switchMap correctly', () => {
            testScheduler.run(({ cold, hot, expectObservable }) => {
                // Hot observable for user typing: typing 'a', then 'ab' rapidly, then waiting
                // Time:  01234567890123456
                // Terms: -a--b-------c---|
                const terms$ = hot('-a--b-------c---|');

                // Mock API call that takes 2 time units to respond
                const mockApi = (term: string) => {
                    if (term === 'b') return cold('--X|', { X: ['result b'] });
                    if (term === 'c') return cold('--Y|', { Y: ['result c'] });
                    return of([]);
                };

                // Expected output:
                // 'a' is debounced because 'b' arrives at frame 4
                // 'b' is processed at frame 4, debounce ends at frame 7 (4+3), 
                // mockApi for 'b' starts at 7, finishes at 9 (7+2)
                // 'c' starts at 12, debounce ends at 15, mockApi finishes at 17
                const expected = '---------b-------c|';
                const result$ = service.search(terms$, mockApi);

                expectObservable(result$).toBe(expected, {
                    b: ['result b'],
                    c: ['result c']
                });
            });
        });

        it('should handle API errors gracefully', () => {
            testScheduler.run(({ hot, expectObservable }) => {
                const terms$ = hot('-a---|');
                const mockApi = () => throwError(() => new Error('API Error'));

                // Debounce (3) + API Error (Sync catchError)
                const expected = '----(e|)';
                const result$ = service.search(terms$, mockApi);

                expectObservable(result$).toBe(expected, {
                    e: ['Error fetching results']
                });
            });
        });
    });
});
