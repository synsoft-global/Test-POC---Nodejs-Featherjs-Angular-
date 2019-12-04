import {
  Component, OnInit, ViewChild, ElementRef
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobService } from '../shared/services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PAGE_No, Page_Size } from '../app.constants';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  @ViewChild('DeleteModal', { static: false }) public ConfirmationModal: ElementRef;
  modalRef: BsModalRef;
  subscriptions: any[] = [];      // stores all service subscriptions
  JobList: any[] = [];        // stores all Job list
  JobId: Number;
  totalcount: Number;
  PageNo: number;
  PageSize: number;
  config = {
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private _toastr: ToastrService,
    private _JobService: JobService, private modalService: BsModalService) { }

  ngOnInit() {
    this.PageNo = PAGE_No;
    this.PageSize = Page_Size;
    this.GetJobList();
  }

  /**
  * Get Job List
  */
  GetJobList() {
    this.subscriptions.push(this._JobService.GetJobList(this.PageNo).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.JobList = res.data; //Bind to view
        this.totalcount = res.total;
      } else {
        this.JobList = [];
        this.showError('Something Went Wrong');
      }
    },
      err => {
        this.showError(err.message);
      }
    ));
  }

  openmodal(JobId) {
    this.JobId = JobId;
    this.modalRef = this.modalService.show(this.ConfirmationModal, this.config);
  }


  /**
 * Use for pagination
 * @param  {number} page: page number
 */
  Paging(page: number) {
    this.PageNo = page;
    this.GetJobList();
  };

  hide() {
    this.modalRef.hide();
  }

  /**
 * Remove Job By JobID
    * @param  {Number} params: JobId
 */
  RemoveJobById(JobId) {
    this.subscriptions.push(this._JobService.RemoveJobById(JobId).subscribe((res: any) => {
      if (res) {
        this.hide();
        this.PageNo = PAGE_No
        this.GetJobList();
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
