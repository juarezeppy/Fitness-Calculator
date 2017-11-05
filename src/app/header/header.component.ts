import { Component, OnInit, Input } from '@angular/core';
import { AuthService }                from '../services/auth.service';
import { User }                       from '../pages/user/user';
import { UserDBService }              from '../services/user-db-service'
import {Observable}                   from 'rxjs/Observable';

@Component({
    selector: 'header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    @Input() page_with_two_sidebar: boolean;
    @Input() page_with_mega_menu:   boolean;

    // consider an alternative, possibly more efficient way of toggling
    loggedIn:   boolean;
    user:       User;

    constructor(private authService: AuthService, private  physicalStats: UserDBService) {
        this.user = new User;
    }

    ngOnInit() {
        this.authService.getAuthState().subscribe(authState => {
            this.loggedIn = this.authService.getLoginStatus();
            console.log(authState);

            if (authState) {
                this.physicalStats.getUserData().forEach( userData => {
                    console.log('header ngOnInit', userData);
                    this.user.Name = userData.name;
                    // this.user.ImageURL = authState.photoURL;
                });

                // NEED TO optimize this.... not retrieving FB image url efficiently.
                authState.providerData.map( value => {
                    console.log(value);
                    this.user.ImageURL = value.photoURL;
                });

            } else {
                this.user.Name = '';
            }
        });
    }

    callLogout() {
        this.authService.logout();
    }
}
