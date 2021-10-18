import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ClientAdress } from '../../clientadress/models/ClientAdress.model';
import { ClientadressService } from '../clientadress.service';
import { ClientadresscreateComponent } from '../clientadresscreate/clientadresscreate.component';

@Component({
  selector: 'app-clienteadresslist',
  templateUrl: './clienteadresslist.component.html',
  styleUrls: ['./clienteadresslist.component.scss']
})
export class ClienteadresslistComponent implements OnInit {
  @Input() filter: any = {};
  items: ClientAdress[];
  page: number = 1;
  config: any;
  id: any;
  constructor(
    private modalService: NgbModal, public activeModal: NgbActiveModal,private spinner: NgxSpinnerService,
    private service: ClientadressService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getAll(false);
  }

  getAll(resetPage: boolean) {
    this.spinner.show();
    if (resetPage) this.page = 1;
    this.filter.idclient= this.id;
    this.service.getPage(this.filter, this.page).subscribe((res) => {
      this.items = res.data;
      this.config = {
        itemsPerPage: res.pageSize,
        currentPage: res.currentPage,
        totalItems: res.totalCount
      };
      this.spinner.hide();
    }, err => {
      this.alertService.info('Este cliente no tiene direcciones')
      this.spinner.hide();
    });
  }

  pageChanged(event: any) {
    this.page = event;
    this.getAll(false);
  }

  closeModal() {
    this.activeModal.close();
  }

  addAdress(){
    var modal = this.modalService.open(ClientadresscreateComponent);
    modal.componentInstance.id = this.id;
    modal.componentInstance.notifyParent.subscribe(() => {
      this.getAll(false);
    });
  }
}
