import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { CompanyService } from '../../company/services/companyservices.service';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clientupdate',
  templateUrl: './clientupdate.component.html',
  styleUrls: ['./clientupdate.component.scss']
})
export class ClientupdateComponent implements OnInit {
  item: Client = new Client();
  companys: any[] = [];
  count: any;
  items: any[] = [];
  id: any;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private serviceCompany: CompanyService, public activeModal: NgbActiveModal, private modalService: NgbModal, private spinner: NgxSpinnerService,
    private service: ClientService,
    private alertService: AlertService) { }

    ngOnInit(): void {
      this.getCompany();
      this.getClientByid();
    }

    closeModal() {
      this.activeModal.close();
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
      this.service.updateClient(this.item).subscribe(
        (resp) => {
          this.spinner.hide();
          const tk = () => this.notifyParent.emit();
          setTimeout(tk, 1500);
          this.alertService.success('Empresa actualizada con exito');
          this.activeModal.close();
        },
        (error) => {
          this.spinner.hide();
          this.alertService.warning(error.error);
          this.activeModal.close();
        }
      );
    }

    getClientByid() {
      this.service.getClientById(this.id).subscribe((res) => {
        this.item = res;
        this.companys = res.companyDto.id
      });
    }
    getCompany() {
      this.serviceCompany.getAllCompany().subscribe((res) => {
        this.companys = res;
      });
    }

}
