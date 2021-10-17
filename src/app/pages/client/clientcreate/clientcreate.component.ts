import { ClientClientAdress } from './../../core/ClientClientAdress.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { CompanyService } from '../../company/services/companyservices.service';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { ClientAdress } from '../../clientadress/models/ClientAdress.model';

@Component({
  selector: 'app-clientcreate',
  templateUrl: './clientcreate.component.html',
  styleUrls: ['./clientcreate.component.scss']
})
export class ClientcreateComponent implements OnInit {
  item: ClientAdress = new ClientAdress();
  clientadress: ClientClientAdress = new ClientClientAdress();
  companys: any[] = [];
  count: any;
  adress: string[] = [];
  adres: string;
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
      !this.clientadress.name ||
      !this.clientadress.idCompany
    ) {
      return this.alertService.info(
        'Todos los campos son obligatorios',
        'Informacion'
      );
    }
    this.spinner.show();
    for(let i = 0 ; i < this.adress.length; i++){
        let adress = this.adress[i];
        const AdressClient : ClientAdress = {
          id: 1,
          adress: adress
        }
        this.clientadress.clientAdressList.push(AdressClient);
    }
    this.service.createClient(this.clientadress).subscribe(
      (resp) => {
        const tk = () => this.notifyParent.emit();
        setTimeout(tk, 1500);
        this.spinner.hide();
        this.alertService.success('Cliente creada con exito');
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

  addAdress(event: any)  {
    this.adress.push(event.target.value);
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
