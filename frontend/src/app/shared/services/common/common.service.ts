import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CommonService {
  constructor() {

  }
  private loadingPropertyChanged = new Subject<boolean>();

  loadingPropertyChanged$: Observable<boolean> = this.loadingPropertyChanged.asObservable();

  showLoading(value) {
    this.loadingPropertyChanged.next(value)
  }
}
