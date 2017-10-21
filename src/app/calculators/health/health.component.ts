import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {

    message:    string;
    formType;
    showGraph:  boolean;
    gender;
    percentile: string;
    type:       string;
    mean:       string;
    iterations: string;

    constructor() {
        this.showGraph = false;
    }

    ngOnInit() {
    }

    receiveMessage($event) {
        this.showGraph  = false;
        this.message    = $event.value.toFixed(2).toString();
        this.gender     = $event.gender;
        this.formType   = $event.formType;
        this.iterations = $event.iterations;
        this.mean       = Math.round($event.mean).toString();
        this.percentile = Math.round($event.zValue * 100).toString();

        this.type = this.formType.toUpperCase();

        setTimeout(() => { // <-- temporary fix to deal with chart resizing on live data LEARN RXJS TO DO AWAY WITH THIS
                this.showGraph = true;
                console.log($event);
            }
            , 250);
    }
}

