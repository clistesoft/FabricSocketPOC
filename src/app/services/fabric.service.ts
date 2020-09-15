import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class FabricService {
  currentUser = this.socket.fromEvent<User>('user');

  constructor(private socket: Socket) { }
  
  newUser() {
    this.socket.emit('addUser', { id: this.rndmUserId(), canvasData: '' });
  }

  private rndmUserId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
