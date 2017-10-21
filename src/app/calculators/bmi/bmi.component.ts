import { Component, EventEmitter, OnInit, Output }       from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { FormValidators }                                from '../../validators/validators';
import { UserDBService }                                 from '../../services/user-db-service';
import { ChartPathService }                              from '../../services/chart-path.service';

import * as chartUtilities                               from '../../utilities/utilities'
const ztable = require('ztable');

@Component({
    selector: 'app-bmi',
    templateUrl: './bmi.component.html',
    styleUrls: ['./bmi.component.css']
})
export class BmiComponent implements OnInit {
    height:  number;
    weight:  number;
    bmiForm: FormGroup;
    userBMI: number;

    @Output() messageEvent = new EventEmitter<object>();

    // consider loading these from a service that gets them from the firebase DB... Or Service
    Gender = [
        {name: 'Male',        modifier: 'male'},
        {name: 'Female',      modifier: 'female'}
    ];

    heightType = [
        {name: 'CM',        modifier: 'cm'},
        {name: 'INCHES',      modifier: 'inch'}
    ];

    weightType =  [
        {name: 'LBS',         modifier: 'lbs'},
        {name: 'KGS',         modifier : 'kgs'}
    ];


    get formHeight() {
        return this.bmiForm.get('formHeight');
    }
    get formAge() {
        return this.bmiForm.get('formAge');
    }
    get formWeight() {
        return this.bmiForm.get('weightGroup').get('formWeight');
    }
    get formWeightType() {
        return this.bmiForm.get('weightGroup').get('formWeightType');
    }
    get formGender() {
        return this.bmiForm.get('formGender');
    }
    get formHeightType() {
        return this.bmiForm.get('formHeightType');
    }

    constructor(private fb: FormBuilder, private userDB: UserDBService, private chartPath: ChartPathService) {
        this.bmiForm = this.fb.group({

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
        this.bmiForm.patchValue({
            formGender: 'male',
            formHeightType: 'inch'
        });

        this.bmiForm.patchValue({weightGroup: {formWeightType: 'lbs'}});
    }

    calcBMI() {
        if (this.formHeightType.value === 'cm') {
            this.height = this.formHeight.value / 2.54;
        }

        if (this.formWeightType.value === 'kgs') {
            this.weight = this.formWeight.value * 2.20462;
        } else {
            this.weight = this.formWeight.value;
        }

        const path = chartUtilities.setChartHealthPath('bmi', this.formAge.value,
            this.formHeight.value, this.formHeightType.value, this.formGender.value);

        console.log('path: ', path);

        this.height = this.formHeight.value * this.formHeight.value;
        this.userBMI = (this.weight / this.height) * 703;


        this.chartPath.changeMessage(path);
        this.userDB.registerHealth(this.userBMI, path);
        this.userDB.getHealthMeanIterations(path, this.userBMI).then( snap => {
            const obj = {
                zValue:     ztable(snap.zValue),
                gender:     this.formGender.value,
                value:      Math.round(this.userBMI),
                formType:   'bmi',
                iterations: snap.iterations,
                mean:       snap.mean
            };
            this.messageEvent.emit(obj);
        });
    }
}
