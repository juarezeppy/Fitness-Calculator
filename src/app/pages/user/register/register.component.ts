import { Component, OnInit }      from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, NavigationStart }                 from '@angular/router';
import { AppComponent }           from '../../../app.component';
import {AuthService}              from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    form = new FormGroup({
        formFirstName: new FormControl('', [
            Validators.required
        ]),
        formLastName: new FormControl('', [
            Validators.required
        ]),
        formUsername: new FormControl('' , [
            Validators.required,
            Validators.email
        ]),
        formPassWord: new FormControl('', [
            Validators.required
        ]),
        formVerifyPassWord: new FormControl('', [
            Validators.required
        ])
    });

    constructor(private authService: AuthService, private router: Router, app: AppComponent) {
        /*
        console.log(router.routerState.snapshot);
        console.log(router.events);
        console.log(router.events.subscribe(result => {
            console.log(result);
        }));
        */
    }
    ngOnInit() {
        // let id = this.route.snapshot.paramMap.get('id');
        window.dispatchEvent(new CustomEvent('page-register-v3-ready'));
    }


    // use all lower case for native validators!!!!
    get formUsername() {
        return this.form.get('formUsername');
    }

    get formPassWord() {
        return this.form.get('formPassWord');
    }

    get formVerifyPassWord() {
        return this.form.get('formVerifyPassWord');
    }

    get formFirstName() {
        return this.form.get('formFirstName');
    }

    get formLastName() {
        return this.form.get('formLastName');
    }

    equalPasswords() {
        if (this.formVerifyPassWord.value === this.formPassWord.value) {
            return true;
        }
        return false;
    }

    signUp() {
        // Remember to fix First/Last name space issues 'John' instead of '     John  ' <-- space issue
        this.authService.signupUserEP(this.formFirstName.value, this.formLastName.value, this.formUsername.value, this.formPassWord.value);
    }

    fbSignUp() {
        this.authService.loginFB();
    }
}

