import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
import { CommonService } from '../common';
import { FeathersService } from '../feathers';

interface UserModel {
  id?: number;
  name: string;
  dateOfBirth?: string;
  email: string;
  status?: string;
  hourlyRate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userService: any;
  constructor(private _commonService: CommonService, private feathers: FeathersService) {
    this.userService = this.feathers.createService<UserModel>('user');
  }

  /**
  * This Method is used for Get all User List
  * @param data
  *   {
    PageNo: Number,
   }
  */
  GetUserList(PageNo) {
    this._commonService.showLoading(true);
    const limit = 10;
    var getuserlist = from(this.userService.find({
      query: {
        $skip: (PageNo - 1) * limit
      }
    }));
    return getuserlist.pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));;
  }

  /**
   *This Method is used for create User
   * @param data
  {
    name: String,
    dateOfBirth: String,
    email: String,
    status: String,
   hourlyRate: String
   }
   */
  AddUser(data: { name: String, dateOfBirth: String, email: String, status: String, hourlyRate: Number }) {
    this._commonService.showLoading(true);
    var createuser = from(this.userService.create(data));
    return createuser.pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));

  }


  /**
  *This Method is used for Update User
  * @param data
 {
   name: String,
    dateOfBirth: String,
    email: String,
    status: String,
   hourlyRate: String
    Id: Number,
  }
  */
  UpdateUser(data: { Id: Number, name: String, dateOfBirth: String, email: String, status: String, hourlyRate: Number }) {
    this._commonService.showLoading(true);
    var updateuser = from(this.userService.update(data.Id, data));
    return updateuser.pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  /**
   * This Method is used for Get User By Id
* @param data
{
UserId: Number
}
*/
  GetUserById(UserId: Number) {
    this._commonService.showLoading(true);
    var getUserbyId = from(this.userService.get(UserId));
    return getUserbyId.pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }


  /**
    * This Method is used for Remove User By Id
* @param data
{
UserId: Number
}
*/
  RemoveUserById(UserId: Number) {
    this._commonService.showLoading(true);
    var removeUserbyId = from(this.userService.remove(UserId));
    return removeUserbyId.pipe(map((response: Response) => { this.onSuccess(); return response }))
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
