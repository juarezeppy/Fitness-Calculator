import { Injectable }           from '@angular/core';
import {AngularFireDatabase}    from 'angularfire2/database';
import {AuthService}            from './auth.service';
import {HttpClient}             from '@angular/common/http';

// This service handles the hud / GUI components for user workout pages
// AND loading their information from the DB in general
@Injectable()
export class UserDBService {
    private userID:     string;
    private address:    string;

    constructor(private http: HttpClient, private db: AngularFireDatabase, private authService: AuthService) {
        const json = '/http://ipv4.myexternalip.com/json';
        // get the user ip to use to enter their data in the db by address
        http.get(json)
            .subscribe((result: any) => {
                console.log(result.ip);
                this.address = result.ip;
                this.address = this.address.split('.').join('');
            },  (e) => {
                console.log(e);
            });

        this.authService.getAuthState().subscribe(authState => {
            if (!authState) {
                this.userID = '';
              } else {
                this.userID = this.authService.getUserID();
                console.log(this.userID);
            }
        });
    }

    // Setter functions
    returnChartData(path: string, isLiftSums: boolean) {
        if (isLiftSums) {
            return this.db.list('liftSumsUnverified/' + path + '/chartData');
        } else {
            return this.db.list('healthSumsUnverifiedUsers/' + path + '/chartData');
        }
    }

    registerBMI(BMI) {
        console.log(this.userID);
        this.db.app.database().ref('physicalstats/' + this.userID).update({
            bmi: BMI
        });
    }

    registerBMR(BMR) {
        console.log(this.userID);
        this.db.app.database().ref('physicalstats/' + this.userID).update({
            bmr: BMR
        });
    }

    registerTDEE(TDEE) {
        this.db.app.database().ref('physicalstats/' + this.userID).update({
            tdee: TDEE
        });
    }

    registerLift(amount, path) {
        console.log('path:', path, ' address:', this.address, ' amount:', amount)
        if (this.address) {
            this.db.app.database().ref()
                .child('liftsUnverifiedUsers/' + path + '/' + this.address)
                .update({
                    amount: parseInt(amount, 10)
                });
        }
    }

    registerHealth(amount, path) {
        console.log('path:', path, ' address:', this.address, ' amount:', amount)
        if (this.address) {
            this.db.app.database().ref()
                .child('healthUnverifiedUsers/' + path + '/' + this.address)
                .update({
                    amount: parseInt(amount, 10)
                });
        }
    }

    // Getter functions
    getUserData () {
        return this.db.object('physicalstats/' + this.userID);
    }

    getZValue(ageGroup, gender, weightGroup, lift, lWeight) {
        console.log(ageGroup, ' ' , gender, ' ', weightGroup, ' ', lift, ' ', lWeight );
        return this.db.app.database().ref('liftSumsUnverified')
           .child(lift)
           .child(gender)
           .child(ageGroup)
           .child(weightGroup)
           .once('value')
            .then( (snapshot) => {
                const zValue = ((lWeight - snapshot.val().mean) / snapshot.val().sd);

                const pathObject = {
                    zValue:         (Math.round(zValue * 100) / 100),
                    iterations:     snapshot.val().iterations,
                    mean:           snapshot.val().mean,
                    biggestLift:    snapshot.val().biggestLift
                };

                return pathObject;
            });
    }

    getHealthMeanIterations(path, bmi) {
        return this.db.app.database().ref('healthSumsUnverifiedUsers')
            .child(path)
            .once('value')
            .then( (snapshot) => {
                const zValue = ((bmi - snapshot.val().mean) / snapshot.val().sd);

                const pathObject = {
                    zValue:     (Math.round(zValue * 100) / 100),
                    iterations: snapshot.val().iterations,
                    mean:       snapshot.val().mean
                };

                return pathObject;
            });
    }
}
