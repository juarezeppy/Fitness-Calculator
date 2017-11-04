import { NgModule, OnInit }         from '@angular/core';
import { BrowserModule, Title }     from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Main Component
import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header/header.component';
import { ContentComponent }         from './content/content.component';
import { FooterComponent }          from './footer/footer.component';
import { TopMenuComponent }         from './top-menu/top-menu.component';
import { MegaMenuComponent }        from './header/mega-menu/mega-menu.component';
import { HomeComponent }            from './home/home.component';


// Dashboard
import { V3BUComponent }            from './pages/dashboard/v3-bu/v3-bu.component';

// User Login / Register
import { LoginV2Page }              from './pages/user/login-v2/login-v2';

// Calculator
import { CalculatorsComponent }     from './calculators/calculators.component';
import { StrengthComponent }        from './calculators/strength/strength.component';
import { HealthComponent }          from './calculators/health/health.component';
import { BmiComponent }             from './calculators/bmi/bmi.component';
import { BmrComponent }             from './calculators/bmr/bmr.component';
import { TdeeComponent }            from './calculators/tdee/tdee.component';
import { LiftsComponent }           from './calculators/lifts/lifts.component';

// SERVICES
import {AuthService}                from './services/auth.service';
import {UserDBService}              from './services/user-db-service';
import {ChartPathService}           from './services/chart-path.service';
import {HttpModule}                 from '@angular/http';
import {AngularFireAuthModule}      from 'angularfire2/auth';
import {AngularFireDatabaseModule}  from 'angularfire2/database';
import {AngularFireModule}          from 'angularfire2';
import { RegisterComponent }        from './pages/user/register/register.component';

// Charts
import { HistogramChartComponent } from './charts/histogram-chart/histogram-chart.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';

// Firebase Config
import {firebaseConfig} from '../firebaseConfig';
import {AuthGuardService} from './services/auth-guard.service';

@NgModule({
    imports:        [
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        HttpModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgxChartsModule
    ],
    declarations:   [
        AppComponent,
        HeaderComponent,
        ContentComponent,
        TopMenuComponent,
        MegaMenuComponent,
        FooterComponent,
        LoginV2Page,
        V3BUComponent,
        CalculatorsComponent,
        BmiComponent,
        BmrComponent,
        TdeeComponent,
        LiftsComponent,
        RegisterComponent,
        StrengthComponent,
        HealthComponent,
        HomeComponent,
        HistogramChartComponent
    ],
    providers: [ Title, AuthService, UserDBService, ChartPathService, AuthGuardService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
    constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
        router.events.subscribe((e) => {
            // change page title when url change
            if (e instanceof NavigationEnd) {
                const title = 'Buddy Up | ' + this.route.snapshot.firstChild.data['title'];
                this.titleService.setTitle(title);
                
                window.dispatchEvent(new CustomEvent('page-reload'));
            }
        });
    }
}
