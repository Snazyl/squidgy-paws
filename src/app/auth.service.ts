import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { IAppUser } from 'models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from 'angularfire2/database';
import { take, map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private route: ActivatedRoute) {
    this.user$ = afAuth.authState
   }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || ('/'); 
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    // const result = this.user$.map(user => {
    //   this.userService.get(user.uid)
    // });
    // console.log(result);
  }

  get appUser$() : Observable<IAppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });    
  }

}
