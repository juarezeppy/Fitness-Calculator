import {Component, EventEmitter, OnInit, Output}         from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { FormValidators }                                from '../../validators/validators';
import {UserDBService}                                   from '../../services/user-db-service';
import {ChartPathService}                                from '../../services/chart-path.service';
import * as chartUtilities                               from '../../utilities/utilities'

const ztable = require('ztable');

@Component({
    selector: 'app-bmr',
    templateUrl: './bmr.component.html',
    styleUrls: ['./bmr.component.css']
})
export class BmrComponent implements OnInit {
    userBMR:                number;
    @Output() messageEvent = new EventEmitter<object>();
    height: number;
    weight: number;
    form:   FormGroup;

    readonly manModifier:   number = 5;
    readonly womanModifier: number = -161;
    readonly inch2CM:       number = 2.54;
    readonly lb2KG:         number = 0.453592;


    // consider loading these from a service that gets them from the firebase DB... Or Service
    Gender = [
        {name: 'Male',        modifier: 'male'},
        {name: 'Female',      modifier: 'female'}
    ];

    heightType = [
        {name: 'CM',          modifier: 'cm'},
        {name: 'INCHES',      modifier: 'inch'}
    ];

    weightType =  [
        {name: 'LBS',         modifier: 'lbs'},
        {name: 'KGS',         modifier : 'kgs'}
    ];

    get formHeight() {
        return this.form.get('formHeight');
    }
    get formAge() {
        return this.form.get('formAge');
    }
    get formWeight() {
        return this.form.get('weightGroup').get('formWeight');
    }
    get formWeightType() {
        return this.form.get('weightGroup').get('formWeightType');
    }
    get formGender() {
        return this.form.get('formGender');
    }
    get formHeightType() {
        return this.form.get('formHeightType');
    }

    constructor(protected fb: FormBuilder, protected userDB: UserDBService, protected chartPath: ChartPathService) {
        this.form = this.fb.group({

            formHeight: new FormControl('', [
                Validators.required,
                FormValidators.cannotContainNonNumbers,
                FormValidators.onlyContainsZero
            ]),
            formAge: new FormControl('', [
                Validators.required,
                FormValidators.cannotContainNonNumbers,
                FormValidators.ageLessOrGreater,
                FormValidators.onlyContainsZero
            ]),
            weightGroup: this.fb.group({
                formWeight: ['', [
                    Validators.required,
                    FormValidators.cannotContainNonNumbers,
                    FormValidators.onlyContainsZero
                ]],
                formWeightType: ['', [Validators.required]]
            }, {validator: Validators.compose([FormValidators.checkMaxBodyweightAndType, FormValidators.checkMinBodyweightAndType])}),

            formHeightType:     new FormControl('', Validators.required),
            formGender:         new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        // this.payload = JSON.stringify(this.form.value);
        // console.log(this.payload);
        this.calcBMR();
    }

    calcBMR() {

        if (this.formHeightType.value === 'cm') {
            this.height = this.formHeight.value / 2.54;
        } else {
            this.height = this.formHeight.value;
        }

        if (this.formWeightType.value === 'kgs') {
            this.weight = this.formWeight.value * 2.20462;
        } else {
            this.weight = this.formWeight.value;
        }

        // Harris–Benedict equation
        this.userBMR = (10 * (this.weight * this.lb2KG)) + (6.25 * (this.height * this.inch2CM)) - (5 * this.formAge.value);

        if (this.formGender.value === 'male') {
            console.log('man');
            this.userBMR += this.manModifier;
        } else {
            console.log('woman');
            this.userBMR += this.womanModifier;
        }

        console.log(this.userBMR);
        // this.userDB.registerBMR(this.userBMR);

        const path = chartUtilities.setChartHealthPath('bmr', this.formAge.value,
            this.formHeight.value, this.formHeightType.value, this.formGender.value);

        this.chartPath.changeMessage(path);
        this.userDB.registerHealth(this.userBMR, path);
        this.userDB.getHealthMeanIterations(path, this.userBMR).then( snap => {
            const obj = {
                zValue:     ztable(snap.zValue),
                gender:     this.formGender.value,
                value:      Math.round(this.userBMR),
                formType:   'bmr',
                iterations: snap.iterations,
                mean:       snap.mean
            };
            this.messageEvent.emit(obj);
        });
    }

    // need to figure out a way to call DB without 7 up the inheritence calling it too...
    calcBMR2() {

        if (this.formHeightType.value === 'cm') {
            this.height = this.formHeight.value / 2.54;
        } else {
            this.height = this.formHeight.value;
        }

        if (this.formWeightType.value === 'kgs') {
            this.weight = this.formWeight.value * 2.20462;
        } else {
            this.weight = this.formWeight.value;
        }

        // Harris–Benedict equation
        this.userBMR = (10 * (this.weight * this.lb2KG)) + (6.25 * (this.height * this.inch2CM)) - (5 * this.formAge.value);

        if (this.formGender.value === 'male') {
            console.log('man');
            this.userBMR += this.manModifier;
        } else {
            console.log('woman');
            this.userBMR += this.womanModifier;
        }

    }
}
