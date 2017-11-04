import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

// Dashboard
import { V3BUComponent }            from './pages/dashboard/v3-bu/v3-bu.component';

// User Login / Register
import { LoginV2Page }              from './pages/user/login-v2/login-v2';
import { RegisterV3Page }           from './pages/user/register-v3/register-v3';

// Calculators
import {CalculatorsComponent}       from './calculators/calculators.component';
import {StrengthComponent}          from './calculators/strength/strength.component';
import {HealthComponent}            from './calculators/health/health.component';

import {RegisterComponent}          from './pages/user/register/register.component';

// auth guard service
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    { path: '', component: StrengthComponent, data: { title: 'Home'} },
    { path: 'calculators', component: CalculatorsComponent },
    { path: 'calculators/strength', component: StrengthComponent, data: { title: 'Strength Calculators'}},
    { path: 'calculators/health', component: HealthComponent, data: { title: 'Health Calculators'}},
    { path: 'dashboard', component: V3BUComponent, canActivate: [AuthGuardService], data: { title: 'Dashboard'} },
    { path: 'login', component: LoginV2Page, data: { title: 'Login V2 Page'} },
    { path: 'register', component: RegisterComponent, data: {title: 'Registration'} },
    { path: 'user/register-v3', component: RegisterV3Page, data: { title: 'Register V3 Page'} },
    { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {enableTracing: false}) // <-- debugging purposes only
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
