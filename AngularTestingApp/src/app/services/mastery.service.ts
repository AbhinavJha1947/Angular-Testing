import { Injectable } from '@angular/core';
import { Observable, switchMap, debounceTime, catchError, of, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RxjsMasteryService {
    /**
     * Simulates a search operation with debounce, switchMap, and error handling.
     * Perfect for demonstrating Marble Testing.
     */
    search(terms: Observable<string>, apiCall: (term: string) => Observable<string[]>): Observable<string[]> {
        return terms.pipe(
            debounceTime(300),
            switchMap(term => {
                if (!term.trim()) {
                    return of([]);
                }
                return apiCall(term).pipe(
                    catchError(() => of(['Error fetching results']))
                );
            })
        );
    }

    /**
     * Demonstrates simple data transformation.
     */
    multiplyBy(input: Observable<number>, factor: number): Observable<number> {
        return input.pipe(
            map(val => val * factor)
        );
    }
}
