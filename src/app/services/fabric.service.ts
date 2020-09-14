import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class FabricService {

  constructor(private socket: Socket) { }
  
}
