import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { IAppUser } from 'models/app-user';
import { of as observableOf } from 'rxjs'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid = this.afAuth.authState.pipe(
    map(authState => authState.uid)
    );  
  isAdmin = observableOf(true);
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  // get(uid: string):AngularFireObject<IAppUser>{
  //   return this.db.object('/users/' + uid);
  // }

  get(uid: string) {
    return this.db.object('/users/' + uid) as unknown as Observable<IAppUser>;
  }
}
