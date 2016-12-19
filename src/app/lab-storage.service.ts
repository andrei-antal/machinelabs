import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as shortid from 'shortid';

import { Lab } from './models/lab';
import { DEFAULT_LAB_CODE } from './default-lab';

declare let firebase: any;

@Injectable()
export class LabStorageService {

  constructor() {

    // Non of this is sensitive. It will be all in the public client.
    // No need to hide it from the repository
    var config = {
      apiKey: "AIzaSyDu0Qds2fWo8iZMcCj0T_ANqD9V4E0_9QY",
      authDomain: "machinelabs-a73cd.firebaseapp.com",
      databaseURL: "https://machinelabs-a73cd.firebaseio.com",
      storageBucket: "machinelabs-a73cd.appspot.com",
      messagingSenderId: "351438476852"
    };
    firebase.initializeApp(config);

    let authPromise = new Promise(resolve => firebase.auth().onAuthStateChanged(resolve))
                      .then(user => user ? user : firebase.auth().signInAnonymously());

    this.login$ = Observable.fromPromise(authPromise).publishLast().refCount();
  }

  login$: Observable<any>;

  createLab(lab: Lab): Lab {
    return {
      id: shortid.generate(),
      // TODO: we may wanna change the return type to Observable<Lab> and prefill with userId
      userId: '',
      code: lab ? lab.code : DEFAULT_LAB_CODE
    };
  }

  getLab(id: string): Observable<Lab> {
    return this.login$
      .switchMap(_ => Observable.fromPromise(firebase.database().ref(`labs/${id}`).once('value')))
      .map((snapshot: any) => snapshot.val());
  }

  saveLab(lab: Lab): Observable<any> {
    return this.login$
      .switchMap((login: any) => {
        let res = firebase.database().ref(`labs/${lab.id}`).set({
          id: lab.id,
          user_id: login.uid,
          code: lab.code
        });
        return Observable.fromPromise(res);
      });
  }

}