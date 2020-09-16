import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class FabricService {
  currentUser = this.socket.fromEvent<User>('user');
  activeUsers = this.socket.fromEvent<any>('users');
  // objModifying = this.socket.fromEvent<any>('object:modifying');
  objModifying = this.socket.fromEvent<any>('objectModifying');


  constructor(private socket: Socket) { }
  
  newUser(value) {
    // console.log('service newUser ',value)
    this.socket.emit('setUser', value);
  }


  objectModifying(obj:any){
    // console.log('service objectModifying ',obj, this.activeUsers)
    this.socket.emit('object:modifying', obj);
    // this.socket
  }

  objectStoppedModifying(obj:any){
    // console.log('service objectStoppedModifying ',obj, this.activeUsers)
    this.socket.emit('object:stoppedModifying', obj);
  }

  // activeUsers(){
  //   this.socket.emit('setUser', value);
  // }

  private rndmUserId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
 
    return text;
  }
}
