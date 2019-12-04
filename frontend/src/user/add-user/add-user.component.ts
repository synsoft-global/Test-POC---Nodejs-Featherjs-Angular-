import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validator, UserService } from 'src/app/shared/services';
import * as moment from 'moment';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  subscriptions: any[] = [];      // stores all service subscriptions
  addUserForm: FormGroup;            // FormGroup for addUserForm
  title: string;
  UserId: Number;
  today: any = moment().format('YYYY-MM-DD');   // todays date
  /**
  * @param  {FormBuilder} private_fb: used to create forms
  * @param  {Router} private_router: used to route application
  * @param  {UserService} private_UserService: used to call User services
  * @param  {ToastrService} private_toastr: used to generate toast notifications
  */
  constructor(private _fb: FormBuilder,
    private _router: Router, private _toastr: ToastrService,
    private route: ActivatedRoute, private _UserService: UserService) {
    this.addUserForm = _fb.group({
      Name: new FormControl('', [
        Validators.maxLength(50),
        Validator.required
      ]),
      Dob: new FormControl('', Validators.required),
      Email: new FormControl('', [
        Validators.required,
        Validator.emailValidator,
        Validators.maxLength(50)
      ]),
      Gender: new FormControl('', [
        Validators.required,
      ]),
      Hourlyrate: new FormControl('', [
        Validators.required,
        Validator.amountValidator
      ]),
    })

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
    }))
  }



  /**
    * Get Job by Id
    * @param  {Number} Id: Job
    */
  GetJobById() {
    this.subscriptions.push(this._UserService.GetUserById(this.UserId).subscribe((res: any) => {
      if (res.success) {
        this.addUserForm.setValue({
          Name: res.data.Name,
          Dob: res.data.Dob,
          Email: res.data.Email,
          Gender: res.data.Gender,
          Hourlyrate: res.data.Hourlyrate
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
  * @param  {FormGroup} value: addCompanyForm
  */
  onSubmit(value) {
    /**
     * call to AddCompany service
     * @param  {FormGroup} value: addCompanyForm
     */
    if (this.UserId) {
      value.Id = this.UserId;
      this.subscriptions.push(this._UserService.UpdateUser(value).subscribe((res: any) => {
        if (res.success) {
          this.showSuccess(res.message);
          this._router.navigate(['/']);
        }
        else {
          this.showError(res.message);
        }
      },
        err => {
          this.showError(err.message);
        }
      ))

    }
    else {
      this.subscriptions.push(this._UserService.AddUser(value).subscribe((res: any) => {
        if (res.success) {
          this.showSuccess(res.message);
          this._router.navigate(['/']);
        }
        else {
          this.showError(res.message);
        }
      },
        err => {
          this.showError(err.message);
        }
      ))
    }

  }


  showSuccess(message) {
    this._toastr.clear();
    this._toastr.success('', message);
  }
  showError(message) {
    this._toastr.clear();
    this._toastr.error('', message);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
