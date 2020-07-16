import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
