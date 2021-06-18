import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  closed$ = new Subject<any>();

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private _counter = 1;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  add(): void {
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      DynamicComponent
    );

    // add the component to the view
    const viewContainerRef = this.container.createComponent(componentFactory);

    // pass some data to the component
    viewContainerRef.instance.index = this._counter++;

    // get `@Output` emitter from the component
    viewContainerRef.instance.emitter
      .pipe(takeUntil(this.closed$))
      .subscribe((event: any) => this.clickHandler(event));

    // add `click` event handler to the component
    fromEvent(viewContainerRef.location.nativeElement, 'click')
      .pipe(takeUntil(this.closed$))
      .subscribe((event: any) => this.clickHandler(event));
  }

  clickHandler(event?: any) {
    console.log(event);
  }

  ngOnDestroy() {
    this.closed$.next(); // <-- close open subscriptions
  }
}
