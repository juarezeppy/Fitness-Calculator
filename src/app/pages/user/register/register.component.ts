import { Component, OnInit }      from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService}              from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form = new FormGroup({
        formFirstName: new FormControl('', [
            Validators.required
        ]),
        formLastName: new FormControl('', [
            Validators.required
        ]),
        formEmail: new FormControl('' , [
            Validators.required,
            Validators.email
        ]),
        formPassWord: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]),
        formVerifyPassWord: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ])
    });

    constructor(private authService: AuthService) {
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-register-v3-ready'));
    }


    // use all lower case for native validators!!!!
    get formEmail() {
        return this.form.get('formEmail');
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
        this.authService.signupUserEP(
            this.formFirstName.value.trim(), this.formLastName.value.trim(),
            this.formEmail.value, this.formPassWord.value);
    }

    fbSignUp() {
        this.authService.loginFB();
    }
}

