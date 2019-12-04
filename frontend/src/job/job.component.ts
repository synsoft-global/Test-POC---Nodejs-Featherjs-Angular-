import {
  Component, OnInit, ViewChild, ElementRef
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobService } from '../shared/services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
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
  config = {
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private _toastr: ToastrService, private _JobService: JobService, private modalService: BsModalService) { }

  ngOnInit() {
    this.GetJobList();
  }

  /**
  * Get Job List
  */
  GetJobList() {
    this.subscriptions.push(this._JobService.GetJobList().subscribe((res: any) => {
      if (res.success) {
        this.JobList = res.data; //Bind to view
      } else {
        this.JobList = [];
        this.showError(res.message);
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


  hide() {
    this.modalRef.hide();
  }

  /**
 * Remove Job By UserID
    * @param  {Number} params: JobId
 */
  RemoveJobById(JobId) {
    this.subscriptions.push(this._JobService.RemoveJobById(JobId).subscribe((res: any) => {
      if (res.success) {
        this.hide();
        this.GetJobList();
        this.showSuccess(res.message);
      } else {
        this.showError(res.message);
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
