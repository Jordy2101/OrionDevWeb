import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import Swal from 'sweetalert2';
import { ClientcreateComponent } from '../clientcreate/clientcreate.component';
import { ClientupdateComponent } from '../clientupdate/clientupdate.component';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.scss']
})
export class ClientlistComponent implements OnInit {
  @Input() filter: any = {};
  page: number = 1;
  items: Client[];
  config: any;
  constructor(
    private modalService: NgbModal,private spinner: NgxSpinnerService,
    private service: ClientService,
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



  inactiveClient(id: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro que desea inactivar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.service.inactiveClient(id).subscribe((resp) => {
          this.spinner.hide();
          this.alertService.success('Cliente inactivada con exito');
          setTimeout(() => {
            this.getAll(false);
          }, 1500);
        });
      }
    });
  }

  updateClient(id: any){
    var modal = this.modalService.open(ClientupdateComponent);
    modal.componentInstance.id = id;
    modal.componentInstance.notifyParent.subscribe(() => {
      this.getAll(false);
    });
  }
  addClient(){
    var modal = this.modalService.open(ClientcreateComponent);
    modal.componentInstance.notifyParent.subscribe(() => {
      this.getAll(false);
    });
  }


}
