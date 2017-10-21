import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-calculators',
    templateUrl: './calculators.component.html',
    styleUrls: ['./calculators.component.css']
})
export class CalculatorsComponent implements OnInit {
    showBMI: boolean;
    showBMR: boolean;
    showLIFT: boolean;
    showTDEE: boolean;
    isActive: boolean;

    @Input() isHealthCalc: boolean;

    constructor() {
        this.showBMI = false;
        this.showBMR = false;
        this.showLIFT = false;
        this.showTDEE = false;
        this.isActive = false;
    }

    ngOnInit() {
    }

    onClickBMI() {
        if (this.isActive === false || this.showBMI === true) {
            this.showBMI = !this.showBMI;
            this.isActive = !this.isActive;
        }

    }

    onClickBMR() {
        if (this.isActive === false || this.showBMR === true) {
            this.showBMR = !this.showBMR;
            this.isActive = !this.isActive;
        }
    }

    onClickLift() {
        if (this.isActive === false || this.showLIFT === true) {
            this.showLIFT = !this.showLIFT;
            this.isActive = !this.isActive;
        }
    }

    onClickTDEE() {
        if (this.isActive === false || this.showTDEE === true) {
            this.showTDEE = !this.showTDEE;
            this.isActive = !this.isActive;
        }
    }
}
