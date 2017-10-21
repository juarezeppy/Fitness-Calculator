import { Component, OnInit }        from '@angular/core';
import {User}                       from '../../pages/user/user';
import {AuthService}                from '../../services/auth.service';
import {UserDBService}              from '../../services/user-db-service';

@Component({
    selector: 'mega-menu',
    templateUrl: './mega-menu.component.html'
})

export class MegaMenuComponent implements OnInit {
    // consider an alternative, possibly more efficient way of toggling
    loggedIn:   boolean;
    user:       User;

    constructor(private authService: AuthService, private  physicalStats: UserDBService) {
        this.user = new User;
    }

    ngOnInit() {
        this.authService.getAuthState().subscribe(authState => {
            this.loggedIn = this.authService.getLoginStatus();

            if (authState) {
                this.physicalStats.getUserData().forEach(userData => {
                    console.log('header ngOnInit', userData);
                    this.user.Name = userData.name;
                });
            } else {
                this.user.Name = '';
            }
        });
    }
}
