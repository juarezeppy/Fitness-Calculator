/* *
*This is a central authentication service that handles
*login/logout functions & the user's current login status function
* The service also instantiates one USER class to read common data from
*/
import { Injectable }           from '@angular/core';
import { AngularFireDatabase }  from 'angularfire2/database';
import { AngularFireAuth }      from 'angularfire2/auth';
import { Router }               from '@angular/router';

import * as firebase            from 'firebase/app';
import { User }                 from '../pages/user/user';

@Injectable()
export class AuthService {
    private user:           User;
    private userID:         string;
    private accessToken:    string;

    private loginStatus:    boolean;
    private fbProvider:     firebase.auth.FacebookAuthProvider;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
        // A subscriber to the user's login/auth state that toggles the login status value
        this.afAuth.authState.subscribe(auth => {
           console.log(auth);
            if (auth === null) {
                this.loginStatus = false;
                this.userID = '';
            } else {
                this.loginStatus = true;
                this.userID = this.afAuth.auth.currentUser.uid;
            }
        });

        this.user = new User;
        this.fbProvider = new firebase.auth.FacebookAuthProvider();

        // add additional fields we need from the api
        this.fbProvider.addScope('public_profile');
        this.fbProvider.addScope('user_friends');
        this.fbProvider.setCustomParameters({               // set login type to popup
            'display': 'popup'
        });
    }

    /*
    * Signup functions EP = email password
    * */
    signupUserEP(firstName: string, lastName: string, email: string, password: string) {
        console.log(firstName, lastName);
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                this.userID = response.uid;
                                                                                // Post new user to database
                this.db.object('users/' + this.userID).update({
                    accessToken: 'NULL',
                    name:  (firstName + ' ' + lastName)
                });

                this.router.navigate(['/dashboard']);                   // route to dashboard after signup
            })
            .catch(
                error => console.log(error)
            )
    }

    /* *
    * Login functions begin
    * Currently have email & password and Facebook api logins
    * */
    login(email: string, password: string) {
        console.log('login function called');
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.userID = response.uid;
                    this.getUserData();                            // <-- get user data from db
                    this.router.navigate(['/dashboard']);  // <-- route to their dashboard
                })
            .catch(error => console.log(error)
            );
    }

    loginFB() {
        this.afAuth.auth.signInWithPopup(this.fbProvider).then(result => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // this.accessToken = result.credential.accessToken;

            console.log('fb object' , result);
            // console.log('user profile id' , result.additionalUserInfo.profile.id);
            console.log('getIdToken' , firebase.auth().currentUser.getIdToken());
            // console.log('uid', result.credential.accessToken);

            this.userID = result.user.uid;
            console.log(this.userID);
            this.getUserData();

            // update user data upon sign in
            this.db.object('users/' + result.user.uid).update({
                accessToken: result.credential.accessToken,
                name: result.user.displayName
            })

            this.router.navigate(['/dashboard']);       // route to dashboard after login
        })
            .catch((error: any) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;                       // The email of the user's account used.
                const credential = error.credential;             // The firebase.auth.AuthCredential type that was used.
            });
    }

    /* *
    * Logout functions
    * */
    logout() {
        console.log('logging out');
        this.afAuth.auth.signOut(); // then calls ngOnInit
    }

    /* *
    * Getter functions for login status and auth
    * */
    getAuthState() {
        return this.afAuth.authState;
    }

    getLoginStatus() {
        return this.loginStatus;
    }

    getUserData () {
        firebase.database().ref('users/' + this.userID).once('value')
            .then(snapshot => {
                this.user.Name = snapshot.val().name;
            })
    }

    getUserID(): string {
        return this.userID;
    }
}

// console.log('logged in', authState, authState.getIdToken()); // equal to firebase.auth().currentUser

// simple json object of facebook api data(providerData)
/*
 const user = firebase.auth().currentUser;

 if (user != null) {
 user.providerData.forEach(function (profile) {
 console.log(profile);
 console.log('Sign-in provider: ' + profile.providerId);
 console.log('  Provider-specific UID: ' + profile.uid);
 console.log('  Name: ' + profile.displayName);
 console.log('  Email: ' + profile.email);
 console.log('  Photo URL: ' + profile.photoURL);
 });
 }
 */

/*
 // Test for the existence of certain keys within a DataSnapshot
 // in this case, test if user exist in database
 const ref = firebase.database().ref('users/' + this.usersID);

 ref.once('value')
 .then(function(snapshot) {
 const userExist = snapshot.exists();  // true
 console.log('in function');
 console.log(userExist);
 })
 .catch((error: any) => {
 // Handle Errors here.
 const errorCode = error.code;
 const errorMessage = error.message;
 // ...
 });
*/

// a clunky way to check if user exist prior to updating database.
/*
  login() {
    // this is a observable / promise... note the then and catch
    const fbLogin = firebase.auth().signInWithPopup(this.provider);

    // Test for the existence of certain keys within a DataSnapshot
    // in this case, test if user exist in database
    this.usersID = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + this.usersID).once('value')
      .then(function(snapshot) {
        if (!snapshot.exists()) {
          fbLogin
            .then(result => {
              console.log('made update');
              const user = result.user;
              firebase.database().ref('users/' + user.uid).update({
                accessToken: result.credential.accessToken,
                name: user.displayName
              });
            })
            .catch((error: any) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              const credential = error.credential;
              console.log(errorMessage);
              // ...
            });
        }
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('doesnt exist')
        // ...
      });
  }
 */


// accessing the FB graph api //NOTE THAT THIS THROWS A DATABASE ACCESS DENIED EXCEPTION
/*
const userRef = this.db.object('/users/' + user.uid);
userRef.subscribe(TEST => {
  const url = `https://graph.facebook.com/v2.8/1225632210875179?fields=first_name,last_name,gender&access_token=${TEST.accessToken}`;
  this.http.get(url).subscribe(response => {
    const OMG = response.json();
    console.log(OMG);
  })
});
*/

