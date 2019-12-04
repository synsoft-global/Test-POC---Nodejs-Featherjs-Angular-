import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CommonService {
  constructor() {

  }
  private loadingPropertyChanged = new Subject<boolean>(); // handles the loader show/hide events
  // events that can be subscribe are written here
  loadingPropertyChanged$: Observable<boolean> = this.loadingPropertyChanged.asObservable();
  //  show/hide loader
  showLoading(value) {
    this.loadingPropertyChanged.next(value)
  }
}
