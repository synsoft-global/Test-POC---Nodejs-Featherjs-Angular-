import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PAGE_No, Page_Size } from '../app.constants';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // get modal reference
  @ViewChild('DeleteModal', { static: false }) public ConfirmationModal: ElementRef;
  modalRef: BsModalRef;
  subscriptions: any[] = [];      // stores all service subscriptions
  UserList: any[] = [];        // stores all User list
  config = {
    ignoreBackdropClick: true,
    keyboard: false
  };
  totalcount: Number;
  PageNo: number;
  PageSize: number;
  UserId: Number;
  constructor(private _toastr: ToastrService, private _UserService: UserService, private modalService: BsModalService) { }

  ngOnInit() {
    this.PageNo = PAGE_No;
    this.PageSize = Page_Size;
    this.GetUserList();
  }


  /**
  * Get List User
  */
  GetUserList() {
    this.subscriptions.push(this._UserService.GetUserList(this.PageNo).subscribe((res: any) => {
      if (res) {
        this.UserList = res.data; //Bind to view
        this.totalcount = res.total;
      } else {
        this.UserList = [];
        this.showError('Something Went Wrong');
      }
    },
      err => {
        this.showError(err.message);
      }
    ));
  }

  openmodal(UserId) {
    this.UserId = UserId;
    this.modalRef = this.modalService.show(this.ConfirmationModal, this.config);
  }

  /**
  * Use for pagination
  * @param  {number} page: page number
  */
  Paging(page: number) {
    this.PageNo = page;
    this.GetUserList();
  };

  hide() {
    this.modalRef.hide();
  }
  /**
  * Remove User By UserID
     * @param  {Number} params: UserId
  */
  RemoveUserById(UserId) {
    this.subscriptions.push(this._UserService.RemoveUserById(UserId).subscribe((res: any) => {
      if (res) {
        this.hide();
        this.PageNo = PAGE_No
        this.GetUserList();
        this.showSuccess('Data deleted successfully.');
      } else {
        this.showError('Something Went Wrong');
      }
    },
      err => {
        this.showError(err.message);
      }
    ));
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
