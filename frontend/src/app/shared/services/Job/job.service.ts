import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
import { CommonService } from '../common';
import { FeathersService } from '../feathers';
interface JobModel {
  id?: number;
  title: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  jobService: any;
  constructor(private _commonService: CommonService, private feathers: FeathersService) {
    this.jobService = this.feathers.createService<JobModel>('job');
  }

  /**
  * This Method is used for Get Job List
  * @param data
  * {
    PageNo: Number,
   }
  */
  GetJobList(PageNo) {
    this._commonService.showLoading(true);
    const limit = 10;
    var GetJobList = from(this.jobService.find({
      query: {
        $skip: (PageNo - 1) * limit
      }
    }
    ));
    return GetJobList.pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));;
  }

  /**
   * This Method is used for Create Job
   * @param data
  {
    Title: String,
    Description: String
   }
   */
  AddJob(data: { title: String, description: String }) {
    this._commonService.showLoading(true);
    var CreateJob = from(this.jobService.create(data));
    return CreateJob.pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }

  /**
   *This Method is used for Update Job By Id
   * @param data
  {
    title: String,
    description: String,
     Id: Number,
   }
   */
  UpdateJob(data: { Id: Number, title: String, description: String }) {
    this._commonService.showLoading(true);
    var Updatejob = from(this.jobService.update(data.Id, data));
    console.log(Updatejob);
    return Updatejob.pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }


  /**
   * This Method is used for Get Job By Id
* @param data
{
 JobId: number
}
*/
  GetJobById(JobId: Number) {
    this._commonService.showLoading(true);
    var Getjobyid = from(this.jobService.get(JobId));
    return Getjobyid.pipe(map((response: Response) => { this.onSuccess(); return response }))
      .pipe(catchError(this.handleError));
  }


  /**
   * This Method is used for Remove Job By Id
* @param data
{
UserId: Number
}
*/
  RemoveJobById(JobId: Number) {
    this._commonService.showLoading(true);
    var Removejobyid = from(this.jobService.remove(JobId));
    return Removejobyid.pipe(map((response: Response) => { this.onSuccess(); return response }))
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
