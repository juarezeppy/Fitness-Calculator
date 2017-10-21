import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit, AfterViewInit {
    @Input() page_sidebar_transparent:  boolean;
    private loggedIn:                   boolean;


    // menu list
    menu = [{
        title: 'Dashboard',
        icon: 'fa fa-laptop',
        link: '/dashboard',
        caret: true
    }, {
        title: 'Calculators',
        icon: 'fa fa-bar-chart-o',
        link: '',
        caret: true,
        submenu: [{
            title: 'Health',
            link: '/calculators/health'
        }, {
            title: 'Strength',
            link: '/calculators/strength'
        }]
    }, {
        title: 'Chart',
        icon: 'fa fa-area-chart',
        link: '',
        caret: true,
        submenu: [{
            title: 'Flot Chart',
            link: '/chart/flot'
        }, {
            title: 'Morris Chart',
            link: '/chart/morris'
        }, {
            title: 'Chart JS',
            link: '/chart/js'
        }, {
            title: 'd3 Chart',
            link: '/chart/d3'
        }]
    }, {
        title: 'Map',
        icon: 'fa fa-map-marker',
        link: '',
        caret: true,
        submenu: [{
            title: 'Vector Map',
            link: '/map/vector'
        }, {
            title: 'Google Map',
            link: '/map/google'
        }]
    }];

    constructor(private authService: AuthService) {
        this.loggedIn = false;
    }

    ngOnInit() {
        this.authService.getAuthState().subscribe(authState => {
            this.loggedIn = this.authService.getLoginStatus();
        });
    }

    // fire event sidebar-ready
    ngAfterViewInit() {
        window.dispatchEvent(new CustomEvent('sidebar-ready'));
    }
}
