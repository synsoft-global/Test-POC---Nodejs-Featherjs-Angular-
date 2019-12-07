import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Validator, CommonService } from '../../shared/services';

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
  Job: IJobModel;
  /**
  * @param  {FormBuilder} private_fb: used to create forms
  * @param  {Router} private_router: used to route application
  * @param  {JobService} private_UserService: used to call Job services
  * @param  {ToastrService} private_toastr: used to generate toast notifications
  */
  constructor(private _fb: FormBuilder,
    private _router: Router, private _toastr: ToastrService, private route: ActivatedRoute,
    private _CommonService: CommonService) {
    this.addJobForm = _fb.group({
      title: new FormControl('', [
        Validators.maxLength(50),
        Validator.required
      ]),
      description: new FormControl('', [Validators.maxLength(500), Validator.required]),
    });
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
    this.subscriptions.push(this._CommonService.GetById(this.JobId, 'job').subscribe((res: any) => {
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
       * call to Update/Add Job service
       * @param  {FormGroup} value: UpdateJobForm
      */
      let methodname = 'Add'
      this.Job = value;
      if (this.JobId) {
        this.Job.id = this.JobId;
        methodname = 'Update';
      };
      this.subscriptions.push(this._CommonService[methodname](this.Job, 'job').subscribe((res: any) => {
        if (res) {
          this.showSuccess('Data ' + methodname + ' successfully.');
          this._router.navigate(['/job']);
        } else
          this.showError('Something Went Wrong');
      }, err => {
        this.showError(err.message);
      }))
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

interface IJobModel {
  id?: number;
  title: string;
  description?: string;
}

