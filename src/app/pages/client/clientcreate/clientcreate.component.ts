import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { CompanyService } from '../../company/services/companyservices.service';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clientcreate',
  templateUrl: './clientcreate.component.html',
  styleUrls: ['./clientcreate.component.scss']
})
export class ClientcreateComponent implements OnInit {
  item: Client = new Client();
  companys: any[] = [];
  count: any;
  items: any[] = [];
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private serviceCompany: CompanyService, public activeModal: NgbActiveModal, private modalService: NgbModal, private spinner: NgxSpinnerService,
    private service: ClientService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.items = [1];
    this.getAllcompany();
  }


  save() {
    if (
      !this.item.name ||
      !this.item.idCompany
    ) {
      return this.alertService.info(
        'Todos los campos son obligatorios',
        'Informacion'
      );
    }
    this.spinner.show();
    this.service.createClient(this.item).subscribe(
      (resp) => {
        const tk = () => this.notifyParent.emit();
        setTimeout(tk, 1500);
        this.spinner.hide();
        this.alertService.success('Empresa creada con exito');
        this.activeModal.close();
      },
      (error) => {
        this.spinner.hide();
        this.alertService.warning(error.error);
        this.activeModal.close();
      }
    );
  }

  duplicatedDiv(event: any) {
    this.items = [];
    this.count = event.target.value;
    for (let i = 0; i < this.count; i++) {
      this.items.push(i);
    }
  }


  closeModal() {
    this.activeModal.close();
  }
  getAllcompany() {
    this.spinner.show();
    this.serviceCompany.getAllCompany().subscribe((res) => {
      this.companys = res;
    });
    this.spinner.hide();
  }
}
