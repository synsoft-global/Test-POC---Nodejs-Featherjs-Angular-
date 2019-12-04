import { Component, OnInit } from '@angular/core';
import { Validator, JobService } from 'src/app/shared/services';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  subscriptions: any[] = [];      // stores all service subscriptions
  addJobForm: FormGroup;            // FormGroup for addUserForm
  title: string;
  JobId: number;
  /**
  * @param  {FormBuilder} private_fb: used to create forms
  * @param  {Router} private_router: used to route application
  * @param  {JobService} private_UserService: used to call Job services
  * @param  {ToastrService} private_toastr: used to generate toast notifications
  */
  constructor(private _fb: FormBuilder,
    private _router: Router, private _toastr: ToastrService, private route: ActivatedRoute,
    private _JobService: JobService) {
    this.addJobForm = _fb.group({
      title: new FormControl('', [
        Validators.maxLength(50),
        Validator.required
      ]),
      description: new FormControl('', [Validators.maxLength(500), Validator.required]),
    })

    this.title = 'Add'
  }
  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.JobId = params['id'];
      //TODO
      if (this.JobId) {
        this.GetJobById()
        this.title = 'Edit';
      }
    }))
  }



  /**
    * Get Job by Id
    * @param  {Number} Id: Job
    */
  GetJobById() {
    this.subscriptions.push(this._JobService.GetJobById(this.JobId).subscribe((res: any) => {
      if (res) {
        this.addJobForm.setValue({
          title: res.title,
          description: res.description
        });
      }
    },
      err => {
        this.showError(err.message);
      }
    ));
  }

  /**
  * function to handle addJobForm submission
  * @param  {FormGroup} value: addJobForm
  */
  onSubmit(value) {
    this.addJobForm.markAllAsTouched(); // This Function is to touch all the input
    if (this.addJobForm.valid) {
      /**
   * call to UpdateJob service
   * @param  {FormGroup} value: UpdateJobForm
   */
      if (this.JobId) {
        value.Id = this.JobId;
        this.subscriptions.push(this._JobService.UpdateJob(value).subscribe((res: any) => {
          if (res) {
            this.showSuccess('Data updated successfully.');
            this._router.navigate(['/job']);
          }
          else {
            this.showError('Something Went Wrong');
          }
        },
          err => {
            this.showError(err.message);
          }
        ))

      }
      else {
        /**
  * call to AddJob service
  * @param  {FormGroup} value: AddJobForm
  */
        this.subscriptions.push(this._JobService.AddJob(value).subscribe((res: any) => {
          if (res) {
            this.showSuccess('Data saved successfully.');
            this._router.navigate(['/job']);
          }
          else {
            this.showError('Something Went Wrong');
          }
        },
          err => {
            this.showError(err.message);
          }
        ))
      }
    }
  }

  /**
  * function to Show toast Success Message
  */
  showSuccess(message) {
    this._toastr.clear();
    this._toastr.success('', message);
  }

  /**
  * function to Show toast Error Message
  */

  showError(message) {
    this._toastr.clear();
    this._toastr.error('', message);
  }

  /**
  * function to Destroy Subscription
  */

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
