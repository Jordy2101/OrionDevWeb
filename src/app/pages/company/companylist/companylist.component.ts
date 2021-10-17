import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import Swal from 'sweetalert2';
import { CreatecompanyComponent } from '../createcompany/createcompany.component';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/companyservices.service';
import { UpdatecompanyComponent } from '../updatecompany/updatecompany.component';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.scss']
})
export class CompanylistComponent implements OnInit {
  @Input() filter: any = {};
  page: number = 1;
  items: Company[];
  config: any;
  constructor(
    private modalService: NgbModal,private spinner: NgxSpinnerService,
    private service: CompanyService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getAll(false);
  }

  getAll(resetPage: boolean) {
    this.spinner.show();
    if (resetPage) this.page = 1;
    if (!this.filter.keyword) this.filter.keyword= '';
    this.service.getPage(this.filter, this.page).subscribe((res) => {
      this.items = res.data;
      this.config = {
        itemsPerPage: res.pageSize,
        currentPage: res.currentPage,
        totalItems: res.totalCount
      };
      this.spinner.hide();
    }, err => {
      this.alertService.info(err.error)
      this.spinner.hide();
    });
  }

  pageChanged(event: any) {
    this.page = event;
    this.getAll(false);
  }


  inactiveCompany(id: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro que desea inactivar la Compania?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.service.inactiveCompany(id).subscribe((resp) => {
          this.spinner.hide();
          this.alertService.success('Compania inactivada con exito');
          setTimeout(() => {
            this.getAll(false);
          }, 1500);
        });
      }
    });
  }

  updateCompany(id: any){
    var modal = this.modalService.open(UpdatecompanyComponent);
    modal.componentInstance.id = id;
    modal.componentInstance.notifyParent.subscribe(() => {
      this.getAll(false);
    });
  }
  addCompany(){
    var modal = this.modalService.open(CreatecompanyComponent);
    modal.componentInstance.notifyParent.subscribe(() => {
      this.getAll(false);
    });
  }

}
