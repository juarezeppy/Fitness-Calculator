import { Component, OnInit }                        from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { FormValidators }                           from '../../validators/validators';
import { BmrComponent }                             from '../bmr/bmr.component'
import { UserDBService }                            from '../../services/user-db-service';
import { ChartPathService }                         from '../../services/chart-path.service';
import * as chartUtilities                          from '../../utilities/utilities'
const ztable = require('ztable');

@Component({
    selector: 'app-tdee',
    templateUrl: './tdee.component.html',
    styleUrls: ['./tdee.component.css']
})

// inherits from bmr component
export class TdeeComponent extends BmrComponent implements OnInit {

    readonly sedentary = 1.2;
    readonly lightExercise = 1.375;
    readonly moderatelyActive = 1.55;
    readonly veryActive = 1.725;
    readonly extremelyActive = 1.9;

    userTDEE: number;

    listValues = [
        {name: 'Sedentary', modifier: this.sedentary},
        {name: 'Light Exercise', modifier: this.lightExercise},
        {name: 'Moderately Active', modifier: this.moderatelyActive},
        {name: 'Very Active', modifier: this.veryActive},
        {name: 'Extremely Active', modifier: this.extremelyActive}
    ];

    constructor(protected fb: FormBuilder, protected userDB: UserDBService, protected chartPath: ChartPathService) {
        super(fb, userDB, chartPath);

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
            formGender:         new FormControl('', Validators.required),
            formActivityLevel: new FormControl('' , Validators.required)
        });
    }

    ngOnInit() {
    }

    onSubmitTDEE() {
        // this.payload = JSON.stringify(this.form.value);
        // console.log(this.payload);

        this.calcBMR2();
        this.userTDEE = this.userBMR * this.form.get('formActivityLevel').value;

        // this.userDB.registerTDEE(this.userTDEE); <-- check this

        const path = chartUtilities.setChartHealthPath('tdee', this.formAge.value,
            this.formHeight.value, this.formHeightType.value, this.formGender.value);

        this.chartPath.changeMessage(path);
        this.userDB.registerHealth(this.userTDEE, path);
        this.userDB.getHealthMeanIterations(path, this.userTDEE).then( snap => {
            const obj = {
                zValue:     ztable(snap.zValue),
                gender:     this.formGender.value,
                value:      Math.round(this.userTDEE),
                formType:   'tdee',
                iterations: snap.iterations,
                mean:       snap.mean
            };
            this.messageEvent.emit(obj);
        });
    }
}
