import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
/**
 * Created by juarezeppy on 7/12/2017.
 */


export class FormValidators {

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {

        if (control.value.toString().indexOf(' ') >= 0) {
            console.log('space found')
            return { cannotContainSpace:  true};
        }

        return null;
    }

    static cannotContainNonNumbers(control: AbstractControl): ValidationErrors | null {

        if (control.value != null) {

            if ((control.value.toString().search(/[\D]+/g) >= 0)) {
                console.log('non number found');
                return {cannotContainNonNumbers: true};
            }
        }
        return null;
    }

    static ageLessOrGreater(control: AbstractControl): ValidationErrors | null {
        if (control.value) {
            console.log(control.value);
            if (control.value < 10 || control.value > 100) {
                console.log('age not within limit');
                return {ageLessOrGreater: true};
            }
        }
        return null;
    }

    static onlyContainsZero(control: AbstractControl): ValidationErrors | null {
        if (control.value === 0) {
            return {onlyContainsZero: true};
        }
        return null;
    }

    static checkMaxBodyweightAndType = (control: AbstractControl): {[key: string]: boolean} => {
        const bodyWeight = control.get('formWeight');
        const weightType = control.get('formWeightType');
        if (!bodyWeight || !weightType) {
            return null;
        }
        if (weightType.value === 'kgs' && bodyWeight.value > 280) {
            return {overWeightValue: true};
        } else if (weightType.value === 'lbs' && bodyWeight.value > 600) {
            return {overWeightValue: true};
        } else {
            return null;
        }
    };

    static checkMinBodyweightAndType = (control: AbstractControl): {[key: string]: boolean} => {
        const bodyWeight = control.get('formWeight');
        const weightType = control.get('formWeightType');
        if (!bodyWeight || !weightType) {
            return null;
        }
        if (weightType.value === 'kgs' && bodyWeight.value < 30) {
            return {underWeightValue: true};
        } else if (weightType.value === 'lbs' && bodyWeight.value < 65) {
            return {underWeightValue: true};
        } else {
            return null;
        }
    };

    /**
     *     inputValidation() {
        if (this.formWeight.value < 30 || this.formHeight.value < 24) {
            return true;
        } else if (this.formWeight.value > 1400 || this.formHeight.value > 108) {
            return true;
        } else {
            return false;
        }
    }
    * */

    static emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
        console.log(control);

        const email = control.get('email');
        const confirm = control.get('confirm');
        if (!email || !confirm) {
            return null;
        }
        return email.value === confirm.value ? null : { nomatch: true };
    };

}
