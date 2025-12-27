import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

describe('CounterComponent (Async Testing)', () => {
    let component: CounterComponent;
    let fixture: ComponentFixture<CounterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CounterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Synchronous Operations', () => {
        it('should increment count immediately', () => {
            expect(component.count).toBe(0);
            component.increment();
            expect(component.count).toBe(1);
        });

        it('should reset count to zero', () => {
            component.count = 5;
            component.reset();
            expect(component.count).toBe(0);
        });
    });

    describe('Async Operations with fakeAsync + tick', () => {
        it('should increment count after 1 second (using fakeAsync)', fakeAsync(() => {
            expect(component.count).toBe(0);

            component.incrementAsync();

            // Time has NOT passed yet
            expect(component.count).toBe(0);

            // Fast-forward time by 1000ms
            tick(1000);

            // Now the async operation should have completed
            expect(component.count).toBe(1);
        }));

        it('should NOT increment if time has not passed', fakeAsync(() => {
            component.incrementAsync();

            tick(500); // Only 500ms passed
            expect(component.count).toBe(0); // Should still be 0

            tick(500); // Complete the remaining 500ms
            expect(component.count).toBe(1); // Now it should be 1
        }));
    });

    describe('Debounce with fakeAsync + tick', () => {
        it('should debounce search input by 500ms', fakeAsync(() => {
            const input = fixture.debugElement.query(By.css('[data-cy=search-input]')).nativeElement;

            // Simulate rapid typing
            input.value = 'a';
            input.dispatchEvent(new Event('input'));
            tick(100);

            input.value = 'an';
            input.dispatchEvent(new Event('input'));
            tick(100);

            input.value = 'ang';
            input.dispatchEvent(new Event('input'));
            tick(100);

            // Still no result because 500ms hasn't passed
            expect(component.searchResult).toBe('');

            // Wait for debounce to complete
            tick(500);

            // Now the search should have executed
            expect(component.searchResult).toBe('Results for: ang');
        }));

        it('should update result only after debounce period', fakeAsync(() => {
            const input = fixture.debugElement.query(By.css('[data-cy=search-input]')).nativeElement;

            input.value = 'test';
            input.dispatchEvent(new Event('input'));

            // Immediately check - should be empty
            expect(component.searchResult).toBe('');

            // Fast-forward past debounce
            tick(500);

            expect(component.searchResult).toBe('Results for: test');

            // Clean up any pending timers
            flush();
        }));
    });

    describe('Using flush() to clear all timers', () => {
        it('should complete all pending async operations with flush()', fakeAsync(() => {
            component.incrementAsync();
            component.incrementAsync();
            component.incrementAsync();

            expect(component.count).toBe(0);

            // Complete ALL pending timers at once
            flush();

            expect(component.count).toBe(3);
        }));
    });

    describe('Alternative: Using done callback', () => {
        it('should increment after timeout (using done)', (done) => {
            component.incrementAsync();

            setTimeout(() => {
                expect(component.count).toBe(1);
                done(); // Signal that the async test is complete
            }, 1100); // Slightly longer than the actual timeout
        });
    });
});
