import { Routes } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CounterComponent } from './components/counter/counter.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserListComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'user-form', component: UserFormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
