import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {UserDBService} from '../../../services/user-db-service';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../user/user';
import { Workout } from '../../../utilities/workout';
import { WorkOutGen } from '../../../utilities/workoutGen';


@Component({
  selector: 'app-v3-bu',
  templateUrl: './v3-bu.component.html',
  styleUrls: ['./v3-bu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class V3BUComponent implements OnInit {
    user: User;
    user$; // <--- observable.
    tempWorkouts = new Array('Dumbell Press 3X10 @60lbs', 'Bench Press 3X10 @155lbs', 'Machine Fly', 'Cable Bench Press');
    workout;
    testWorkout: WorkOutGen;
    constructor(private authService: AuthService, private physicalStats: UserDBService, private router: Router) {
        this.user = new User();
    }
  ngOnInit() {
      this.testWorkout = new WorkOutGen;
      this.workout = this.tempWorkouts[0];

      window.dispatchEvent(new CustomEvent('dashboard-v3-ready'));

      this.authService.getAuthState().subscribe(authState => {   // <--- af auth object
          if (!authState) {
              this.router.navigate(['/']);
          } else {
              this.user.Name = authState.displayName;
              this.user.ImageURL = authState.photoURL;

              this.user$ = this.physicalStats.getUserData();
              this.user$.subscribe( snapshot => {   // <--- snapshot contains the object from the database
                  this.user.BMI = Math.round(snapshot.bmi * 100) / 100;
                  this.user.BMR = Math.round(snapshot.bmr * 100) / 100;
                  this.user.TDEE = Math.round(snapshot.tdee * 100) / 100;
                  this.user.Weight = Math.round(snapshot.weight * 100) / 100;
                  this.user.Age = snapshot.age;
              });
          }
      });
    }

  swap() {
    let index = Math.floor((Math.random() * this.tempWorkouts.length));

    while (this.tempWorkouts[index] === this.workout) {
        index = Math.floor((Math.random() * this.tempWorkouts.length));
        console.log('executing loop');
    }

    this.workout = this.tempWorkouts[index];
    this.testWorkout.generateWorkout();
  }

}
