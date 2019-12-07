import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validator, CommonService } from 'src/app/shared/services';
import * as moment from 'moment';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  subscriptions: any[] = [];      // stores all service subscriptions
  addUserForm: FormGroup;            // FormGroup for addUserForm
  title: string = '';
  UserId: number;
  User: IUserModel;
  today: any = moment().format('YYYY-MM-DD');   // todays date
  /**
  * @param  {FormBuilder} private_fb: used to create forms
  * @param  {Router} private_router: used to route application
  * @param  {UserService} private_UserService: used to call User services
  * @param  {ToastrService} private_toastr: used to generate toast notifications
  */
  constructor(private _fb: FormBuilder,
    private _router: Router, private _toastr: ToastrService,
    private route: ActivatedRoute, private _CommonService: CommonService) {
    this.addUserForm = _fb.group({
      name: new FormControl('', [
        Validators.maxLength(50),
        Validator.required
      ]),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validator.emailValidator,
        Validators.maxLength(50)
      ]),
      status: new FormControl('', [
        Validators.required,
      ]),
      hourlyRate: new FormControl('', [
        Validators.required,
        Validator.amountValidator
      ]),
    });
    this.title = 'Add'
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.UserId = params['id'];
      //TODO
      if (this.UserId) {
        this.GetJobById()
        this.title = 'Edit';
      }
    }));
  }

  /**
    * Get Job by Id
    * @param  {Number} Id: Job
    */
  GetJobById() {
    this.subscriptions.push(this._CommonService.GetById(this.UserId, 'user').subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.addUserForm.setValue({
          name: res.name,
          dateOfBirth: res.dateOfBirth,
          email: res.email,
          status: res.status,
          hourlyRate: res.hourlyRate
        });
      }
    }, err => {
      this.showError(err.message);
    }));
  }

  /**
  * function to handle addUserForm submission
  * @param  {FormGroup} value: addUserForm
  */
  onSubmit(value) {
    this.addUserForm.markAllAsTouched(); // This Function is to touch all the input
    if (this.addUserForm.valid) {
      /**
       * call to Add/UpdateUser service
       * @param  {FormGroup} value: UpdateUserForm
      */
      this.User = value;
      let methodname = 'Add'
      if (this.UserId) {
        this.User.id = this.UserId;
        methodname = 'Update';
      }
      this.subscriptions.push(this._CommonService[methodname](this.User, 'user').subscribe((res: any) => {
        if (res) {
          this.showSuccess('Data ' + methodname + ' successfully.');
          this._router.navigate(['/']);
        }
        else
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

interface IUserModel {
  id?: number;
  name: string;
  dateOfBirth: string;
  email: string;
  status: string;
  hourlyRate: string;
}
