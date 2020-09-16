import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { Observable, Subscription } from 'rxjs';
import { FabricService } from 'src/app/services/fabric.service';
import { User } from 'src/app/user';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  @Input() user: User;
  @Input() activeUsers: any;
  objModifying: Observable<any>; 

   private canvas: any;
   private boundbox: any;
   private _userSub: Subscription;

   private activeCursor: any;

   isModifying = false;

   constructor(public fabricService: FabricService) { }

  // @ViewChild('mycanvas', {static: true}) mycanvas: ElementRef;
  ngOnDestroy() {
    // this._userSub.unsubscribe();
  }
  ngOnInit(): void { 
    // objModifying
    console.log('ngOnInit');
 
    this._userSub = this.fabricService.objModifying.pipe(
      startWith({ id: null, left:0, top:0 })
    ).subscribe((objModifying) => {
      // console.log('>>>>>', objModifying);
      this.objModifying = objModifying}
      );
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'hand',
      selection: true,
      backgroundColor: '#F0F8FF', 
      selectionBorderColor: 'blue',
      defaultCursor: 'hand'
   });

   this.boundbox = new fabric.Rect({
    left: 100,
    top: 120,
    fill: '#2ecc71',
    width: 100,
    height: 100,
    originX: 'center',
    originY: 'center',
    });

    this.canvas.add(this.boundbox);
    this.canvas.renderAll();
    this.canvas.on('object:moving', this.emitObjectModifying.bind(this));
    this.canvas.on('mouse:up', this.emitObjectStoppedModifying.bind(this));
    console.log(this.objModifying)
  }

  emitObjectModifying(event):void {
    // console.log('emitObjectModifying',event)
    this.isModifying = true;
    var activeObject = event.target;

    this.activeCursor = {
      left: activeObject.left, 
      top: activeObject.top, 
    }

    this.fabricService.objectModifying({
      id: activeObject.id,
      left: activeObject.left,
      top: activeObject.top,
      scaleX: activeObject.scaleX,
      scaleY: activeObject.scaleY,
      angle: activeObject.angle,
      username: this.user.name
    });

  }
  emitObjectStoppedModifying(event):void {
    console.log('emitObjectStoppedModifying',event.target)
    this.isModifying = false;
    this.fabricService.objectStoppedModifying({
      userN: this.user.name
    });
    
    this.activeCursor = {
      left: 0,
      top: 0,
    }
  }

}
