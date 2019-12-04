import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './job.component';
import { AddJobComponent } from './add-job/add-job.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: JobComponent,
    },
    {
      path: 'add',
      component: AddJobComponent,
    },
    {
      path: 'edit/:id',
      component: AddJobComponent
    },]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
