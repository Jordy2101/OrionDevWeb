import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientlistComponent } from './clientlist/clientlist.component';
import { ClientcreateComponent } from './clientcreate/clientcreate.component';
import { ClientupdateComponent } from './clientupdate/clientupdate.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClienteadresslistComponent } from './clienteadresslist/clienteadresslist.component';
import { ClientadresscreateComponent } from './clientadresscreate/clientadresscreate.component';



@NgModule({
  declarations: [
    ClientlistComponent,
    ClientcreateComponent,
    ClientupdateComponent,
    ClienteadresslistComponent,
    ClientadresscreateComponent
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
    ClientupdateComponent,
    ClienteadresslistComponent,
    ClientadresscreateComponent
  ]
})
export class ClientModule { }
