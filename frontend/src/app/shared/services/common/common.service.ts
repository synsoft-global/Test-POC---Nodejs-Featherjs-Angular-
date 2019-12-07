import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
import { FeathersService } from '../feathers';

@Injectable()
export class CommonService {
  CommonService: any;
  private loadingPropertyChanged = new Subject<boolean>(); // handles the loader show/hide events
  // events that can be subscribe are written here
  loadingPropertyChanged$: Observable<boolean> = this.loadingPropertyChanged.asObservable();
  constructor(private feathers: FeathersService) { }

  //  show/hide loader
  showLoading(value) {
    this.loadingPropertyChanged.next(value)
  }

  /**
  * This Method is used for Get all User List
  * @param data
  *   {
    PageNo: Number,
   }
  */
  GetList(PageNo, methodname) {
    this.CommonService = this.feathers.createService(methodname);
    this.showLoading(true);
    const limit = 10;
    return from(this.CommonService.find({
      query: {
        $skip: (PageNo - 1) * limit
      }
    })).pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  /**
   *This Method is used for create User
   * @param data
  {}
   */
  Add(data, methodname) {
    this.CommonService = this.feathers.createService(methodname);
    this.showLoading(true);
    return from(this.CommonService.create(data)).pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));

  }

  /**
  *This Method is used for Update User
  * @param data
  */
  Update(data, methodname) {
    console.log(data);
    this.CommonService = this.feathers.createService(methodname);
    this.showLoading(true);
    return from(this.CommonService.update(data.id, data)).pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  /**
   * This Method is used for Get User By Id
* @param data
{
Id: Number
}
*/
  GetById(Id: Number, methodname) {
    this.CommonService = this.feathers.createService(methodname);
    this.showLoading(true);
    return from(this.CommonService.get(Id)).pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  /**
    * This Method is used for Remove User By Id
  * @param data
  {
  Id: Number
  }
*/
  RemoveById(Id: Number, methodname) {
    this.CommonService = this.feathers.createService(methodname);
    this.showLoading(true);
    return from(this.CommonService.remove(Id)).pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    this.showLoading(false);
    return throwError(error.json());
  }

  private onSuccess() {
    this.showLoading(false);
  }
}
