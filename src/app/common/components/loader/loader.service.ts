import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoaderState } from './loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderSubject = new BehaviorSubject<LoaderState>({show: false});
  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  show(): void {
          this.loaderSubject.next({show: true});
  }

  hide(): void{
          this.loaderSubject.next({show: false});
  }

}
