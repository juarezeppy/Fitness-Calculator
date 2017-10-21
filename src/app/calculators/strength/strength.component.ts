import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strength',
  templateUrl: './strength.component.html',
  styleUrls: ['./strength.component.css']
})
export class StrengthComponent implements OnInit {

  showGraph:   boolean;
  message:     string;
  gender:      string;
  formType:    string;
  liftRatio:   string;
  userMax:     string;
  weightType:  string;
  mean:        string;
  iterations:  string;
  biggestLift: string;

  constructor() {
    this.showGraph = false;
  }

  ngOnInit() {
  }

  receiveMessage($event) {
    this.showGraph    = false;
    this.message      = Math.round($event.zValue * 100).toString();
    this.userMax      = Math.round($event.userMax).toString();
    this.biggestLift  = Math.round($event.largest).toString();
    this.gender       = $event.gender;
    this.formType     = $event.formType;
    this.liftRatio    = $event.ratio.toFixed(2).toString();
    this.mean         = Math.round($event.mean).toString();
    this.iterations   = $event.iterations;

    setTimeout(() => { // <-- temporary fix to deal with chart resizing on live data LEARN RXJS TO DO AWAY WITH THIS
        this.showGraph = true;
        console.log($event);
      }
      , 250);
  }
}
