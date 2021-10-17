import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatecompanyComponent } from './createcompany/createcompany.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompanylistComponent } from './companylist/companylist.component';
import { UpdatecompanyComponent } from './updatecompany/updatecompany.component';



@NgModule({
  declarations: [
    CreatecompanyComponent,CompanylistComponent, UpdatecompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanylistComponent,
      },
    ]),
  ], entryComponents: [
    CreatecompanyComponent,
    UpdatecompanyComponent
  ]
})
export class CompanyModule { }
