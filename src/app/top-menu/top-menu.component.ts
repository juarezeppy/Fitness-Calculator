import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})

export class TopMenuComponent implements AfterViewInit {
    // fire event sidebar-two-ready
    ngAfterViewInit() {
        window.dispatchEvent(new CustomEvent('top-menu-ready'));
    }

    // menu list
    menu = [{
        title: 'Dashboard',
        icon: 'fa fa-laptop',
        link: '/dashboard/v3bu',
        caret: 'true'
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
    }, {
        title: 'Login & Register',
        icon: 'fa fa-key',
        link: '',
        caret: true,
        submenu: [{
            title: 'Login',
            link: '/user/login'
        }, {
            title: 'Login v2',
            link: '/user/login-v2'
        }, {
            title: 'Login v3',
            link: '/user/login-v3'
        }, {
            title: 'Register v3',
            link: '/user/register-v3'
        }]
    }];

}
