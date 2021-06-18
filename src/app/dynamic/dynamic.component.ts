import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent {
  @Input() index: number;
  @Input() message: string;
  @Output() emitter = new EventEmitter<any>();

  onClick() {
    this.emitter.emit(`Clicked ${this.index}`);
  }
}
