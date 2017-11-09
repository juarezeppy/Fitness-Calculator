import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidators}                          from '../../validators/validators';
import {UserDBService}                           from '../../services/user-db-service';
import {ChartPathService}                        from '../../services/chart-path.service';

import * as chartUtilities                       from '../../utilities/utilities'

// imported from npm package ztable from: https://www.npmjs.com/package/ztable
const ztable = require('ztable');

@Component({
  selector: 'app-lifts',
  templateUrl: './lifts.component.html',
  styleUrls: ['./lifts.component.css']
})
export class LiftsComponent implements OnInit {
    @Output() messageEvent = new EventEmitter<object>();
    private liftWeight: number;
    private path:       string;
    private bodyWeight: number;
    form: FormGroup;

    // consider loading these from a service that gets them from the firebase DB...
    Gender = [
        {name: 'Male',        modifier: 'male'},
        {name: 'Female',      modifier: 'female'}
    ];

    weightType =  [
        {name: 'LBS',         modifier: 'lbs'},
        {name: 'KGS',         modifier : 'kgs'}
    ];

    barbellExercises = [
        {name: 'Bench',       modifier: 'bench'},
        {name: 'Deadlift',    modifier : 'deadlift'},
        {name: 'Squat',       modifier: 'squat'},
        {name: 'Front Squat', modifier : 'frontSquat'}
    ];

    olympicExercises = [
        {name: 'Power Clean',       modifier: 'powerClean'},
        {name: 'Clean', modifier : 'clean'}
    ];

    /*
    bodyweightExercises = [
        {name: 'Push Ups',       modifier: 'pushups'},
        {name: 'Pull Ups',       modifier : 'pullups'}
    ];
    */

    constructor(private fb: FormBuilder, private db: UserDBService, private chartPath: ChartPathService) {
        this.form = this.fb.group({
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

            formLiftWeight: new FormControl('', [
                Validators.required,
                FormValidators.cannotContainNonNumbers,
                FormValidators.onlyContainsZero,
            ]),
            formRepetitions: new FormControl('', [
                Validators.required,
                FormValidators.cannotContainNonNumbers,
                FormValidators.onlyContainsZero,
                Validators.max(15)
            ]),

            formGender:         new FormControl('', Validators.required),
            formLift:           new FormControl('' , Validators.required),
            formLiftWeightType: new FormControl('', Validators.required)
        });
  }

    ngOnInit() {
        this.form.patchValue({
            formLiftWeightType: 'lbs',
            formGender: 'male',
            formLift: 'squat'
        });

        // load default form values
        this.form.patchValue({weightGroup: {formWeightType: 'lbs'}});
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
    get formLift() {
        return this.form.get('formLift');
    }
    get formLiftWeight() {
        return this.form.get('formLiftWeight');
    }
    get formLiftWeightType() {
        return this.form.get('formLiftWeightType');
    }
    get formRepetitions() {
        return this.form.get('formRepetitions');
    }

  onSubmitLift() {
        // this.payload = JSON.stringify(this.form.value);
        this.calcZValue();
        this.db.registerLift(this.liftWeight, this.path);
    }


  calcZValue() {
      const kg2lbConv = 2.20462;
      const ageGroup:   string = chartUtilities.getAgeGroup(this.formAge.value);
      let weightGroup:  string;

      this.liftWeight = Math.floor(chartUtilities.brzyckiOneRM(this.formLiftWeight.value, this.formRepetitions.value));

      if (this.formWeightType.value === 'lbs') {
          this.bodyWeight = this.formWeight.value / kg2lbConv;
      } else {
          this.bodyWeight = this.formWeight.value;
      }

      if (this.formLiftWeightType.value === 'lbs') {
          this.liftWeight = this.liftWeight / kg2lbConv ;
      }

      if (this.formGender.value === 'male') {
          weightGroup = chartUtilities.getWeightGroupMen(this.bodyWeight);
      } else if (this.formGender.value === 'female') {
          weightGroup = chartUtilities.getWeightGroupWomen(this.bodyWeight);
      }

       this.path =
            this.formLift.value + '/'
          + this.formGender.value + '/'
          + ageGroup + '/'
          + weightGroup;
      console.log(this.path);

      this.chartPath.changeMessage(this.path);

      this.db.getZValue(ageGroup, this.formGender.value, weightGroup, this.formLift.value, this.liftWeight)
        .then(snap => {
            console.log(snap);
            console.log(this.liftWeight, ' ', this.bodyWeight);
            const ratio = (this.liftWeight / this.bodyWeight);
            const pathObject = {
                zValue:     ztable(snap.zValue),
                iterations: snap.iterations,
                mean:       snap.mean,
                largest:    snap.biggestLift,
                gender:     this.formGender.value,
                formType:   this.formLift.value,
                userMax:    this.liftWeight,
                ratio:      ratio
            };

            this.messageEvent.emit(pathObject);
        });
  }
}
