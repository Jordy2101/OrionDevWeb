import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientlistComponent } from './clientlist/clientlist.component';
import { ClientcreateComponent } from './clientcreate/clientcreate.component';
import { ClientupdateComponent } from './clientupdate/clientupdate.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ClientlistComponent,
    ClientcreateComponent,
    ClientupdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientlistComponent,
      },
    ]),
  ], entryComponents: [
    ClientcreateComponent,
    ClientupdateComponent
  ]
})
export class ClientModule { }
