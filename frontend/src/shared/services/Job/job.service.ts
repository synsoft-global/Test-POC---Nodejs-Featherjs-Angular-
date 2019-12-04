import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonService } from '../common';
import { BASE_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private http: HttpClient, private _commonService: CommonService) { }

  /**
  *
  * @param data
  */
  GetJobList() {
    this._commonService.showLoading(true);
    return this.http.get(`${BASE_URL}/api/job/GetAllJob`)
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));;
  }

  /**
   *
   * @param data
  {
    Title: String,
    Description: String
   }
   */
  AddJob(data: { Title: String, Description: String }) {
    this._commonService.showLoading(true);
    return this.http.post(`${BASE_URL}/api/job/RegisterJob`, data)
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * @param data
  {
    Title: String,
    Description: String,
     Id: Number,
   }
   */
  UpdateJob(data: { Id: Number, Title: String, Description: String }) {
    this._commonService.showLoading(true);
    return this.http.put(`${BASE_URL}/api/job/UpdateJob/${data.Id}`, { data: data })
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }


  /**
* @param data
{
 JobId: number
}
*/
  GetJobById(JobId: Number) {
    this._commonService.showLoading(true);
    return this.http.get(`${BASE_URL}/api/Job/GetJobById/${JobId}`)
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }


  /**
* @param data
{
UserId: Number
}
*/
  RemoveJobById(JobId: Number) {
    this._commonService.showLoading(true);
    return this.http.delete(`${BASE_URL}/api/Job/removeJobById/${JobId}`)
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    this._commonService.showLoading(false);
    return throwError(error.json());
  }

  private onSuccess() {
    this._commonService.showLoading(false);
  }
}
