import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://api.example.com/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl).pipe(
            catchError(error => throwError(() => new Error('Failed to fetch users')))
        );
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
            catchError(error => throwError(() => new Error(`User ${id} not found`)))
        );
    }

    createUser(user: Omit<User, 'id'>): Observable<User> {
        return this.http.post<User>(this.apiUrl, user).pipe(
            catchError(error => throwError(() => new Error('Failed to create user')))
        );
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
            catchError(error => throwError(() => new Error('Failed to update user')))
        );
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError(error => throwError(() => new Error('Failed to delete user')))
        );
    }
}
