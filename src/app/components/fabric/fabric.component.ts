import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
   private canvas: any;
   private boundbox: any;

  constructor() { }

  // @ViewChild('mycanvas', {static: true}) mycanvas: ElementRef;

  ngOnInit(): void {
    console.log('mycanvas', this.mycanvas)
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
  }

}
