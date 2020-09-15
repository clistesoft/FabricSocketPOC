import { FabricService } from './services/fabric.service';
import { Subscription } from 'rxjs';

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
  private _userSub: Subscription;
// export class AppComponent {
  title = 'fabric-socketPOC';
  submitted = false;
  // currentUser = null;
  model = new User(null,'');
  constructor(private fabricService: FabricService) { }


  ngOnInit() {
    this._userSub = this.fabricService.currentUser.pipe(
      // startWith({ id: '', canvasData: 'Select an existing canvas'})
    ).subscribe(currentUser => this.currentUser = currentUser);
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }


  onSubmit() { 
    this.submitted = true; 
    // this.fabricService.newUser()
    this.currentUser = { id:this.model.id, name: this.model.name };
    console.log(this.model, this.currentUser )

  }
 
}
