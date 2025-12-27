import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';

@Component({
    selector: 'app-counter',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="counter-container">
      <h2>Async Counter Demo</h2>
      <p>Count: {{ count }}</p>
      <button (click)="increment()" data-cy="increment-btn">Increment</button>
      <button (click)="incrementAsync()" data-cy="increment-async-btn">Increment Async (1s)</button>
      <button (click)="reset()" data-cy="reset-btn">Reset</button>
      
      <div class="debounce-section">
        <h3>Debounce Demo</h3>
        <input 
          type="text" 
          (input)="onSearchInput($event)" 
          placeholder="Type to search..."
          data-cy="search-input"
        />
        <p>Search Result: {{ searchResult }}</p>
      </div>
    </div>
  `,
    styles: [`
    .counter-container { padding: 20px; }
    button { margin: 5px; padding: 10px; }
    .debounce-section { margin-top: 20px; padding: 15px; border: 1px solid #ddd; }
    input { width: 100%; padding: 8px; margin-bottom: 10px; }
  `]
})
export class CounterComponent {
    count = 0;
    searchResult = '';
    private searchSubject = new Subject<string>();

    constructor() {
        // Debounce search input by 500ms
        this.searchSubject.pipe(
            debounceTime(500)
        ).subscribe(term => {
            this.performSearch(term);
        });
    }

    increment(): void {
        this.count++;
    }

    incrementAsync(): void {
        setTimeout(() => {
            this.count++;
        }, 1000);
    }

    reset(): void {
        this.count = 0;
    }

    onSearchInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchSubject.next(value);
    }

    performSearch(term: string): void {
        this.searchResult = term ? `Results for: ${term}` : '';
    }
}
