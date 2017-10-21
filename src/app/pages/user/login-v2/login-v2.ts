import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'login-v2',
    templateUrl: './login-v2.html',
    styleUrls: ['../../../../assets/plugins/bootstrap-social/bootstrap-social.css']
})

export class LoginV2Page implements OnInit {

    form = new FormGroup({
        formUsername: new FormControl('' , [
            Validators.required
        ]),
        formPassWord: new FormControl('', [
            Validators.required
        ])
    });

    constructor(private authService: AuthService) { }

    // use all lower case for native validators!!!!
    // example minlength NOT minLength

    get formUsername() {
        return this.form.get('formUsername');
    }

    get formPassWord() {
        return this.form.get('formPassWord');
    }
    ngOnInit() {
    }

    fbLogin() {
        this.authService.loginFB();
    }

    loginEP() {
        console.log(this.formUsername.value, this.formPassWord.value);
        this.authService.login(this.formUsername.value, this.formPassWord.value);
    }
}
