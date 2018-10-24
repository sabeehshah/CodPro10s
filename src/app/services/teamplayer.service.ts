import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Player } from '../models/Player';
import { TeamPlayer } from '../models/TeamPlayer';
import { Observable } from 'rxjs';
import { Series } from '../models/Series'



@Injectable({
  providedIn: 'root'
})
export class TeamplayerService {

  

  constructor() { }
}
