import { FabricService } from './services/fabric.service';
import { Observable, Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
// import {fabric} from './components/fabric/fabric.component';
 import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: User;
  activeUsers: Observable<string[]>;
  private _userSub: Subscription;
// export class AppComponent {
  title = 'fabric-socketPOC';
  submitted = false;
  // currentUser = null;
  model = new User(null,'', this.randColor());
  constructor(private fabricService: FabricService) { }

 randColor() {
    var color = (function lol(m, s, c) {
                    return s[m.floor(m.random() * s.length)] +
                        (c && lol(m, s, c - 1));
                })(Math, '3456789ABCDEF', 4);
    return '#'+color;
}
  ngOnInit() {
    // this.activeUsers = this.fabricService.activeUsers.pipe().subscribe();
this._userSub = this.fabricService.activeUsers.pipe().subscribe(activeUsers => this.activeUsers = activeUsers);
    // this._userSub = this.fabricService.currentUser.pipe(
    //   // startWith({ id: '', canvasData: 'Select an existing canvas'})
    // ).subscribe(currentUser => this.currentUser = currentUser);
    // console.log('ngOnInit', this.activeUsers)
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }

  onSubmit() { 
    this.submitted = true; 
    // var tmpColor = ;
    this.currentUser = { id:this.model.id, name: this.model.name, color: this.model.color };
    this.fabricService.newUser({name: this.model.name, color: this.model.color} );
    // console.log(this.model, this.currentUser )
  }
 
}
