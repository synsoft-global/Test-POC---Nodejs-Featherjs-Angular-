import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { AddJobComponent } from './add-job/add-job.component';


@NgModule({
  declarations: [JobComponent, AddJobComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule, CommonModule,
    JobRoutingModule
  ]
})
export class JobModule { }
