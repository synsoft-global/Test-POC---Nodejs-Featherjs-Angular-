import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonService } from '../common';
import { BASE_URL } from 'src/app/app.constants';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private _commonService: CommonService) { }

  /**
  *
  * @param data
  */
  GetUserList() {
    this._commonService.showLoading(true);

    return this.http.get(`${BASE_URL}/api/GetAllUser`)
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));;
  }

  /**
   *
   * @param data
  {
    Name: String,
    Dob: String,
    Email: String,
    Gender: String,
    Hourlyrate: String
   }
   */
  AddUser(data: { Name: String, Dob: String, Email: String, Gender: String, Hourlyrate: Number }) {
    this._commonService.showLoading(true);
    return this.http.post(`${BASE_URL}/api/RegisterUser`, data)
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }


  /**
  *
  * @param data
 {
   Name: String,
    Dob: String,
    Email: String,
    Gender: String,
    Hourlyrate: String
    Id: Number,
  }
  */
  UpdateUser(data: { Id: Number, Name: String, Dob: String, Email: String, Gender: String, Hourlyrate: Number }) {
    this._commonService.showLoading(true);
    return this.http.put(`${BASE_URL}/api/UpdateUser/${data.Id}`, { data: data })
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  /**
* @param data
{
UserId: Number
}
*/
  GetUserById(UserId: Number) {
    this._commonService.showLoading(true);
    return this.http.get(`${BASE_URL}/api/GetUserById/${UserId}`)
      .pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }


  /**
* @param data
{
UserId: Number
}
*/
  RemoveUserById(UserId: Number) {
    this._commonService.showLoading(true);
    return this.http.delete(`${BASE_URL}/api/removeUserById/${UserId}`)
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
