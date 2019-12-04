import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UserComponent, AddUserComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
