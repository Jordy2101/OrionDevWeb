import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ClientAdress } from '../../clientadress/models/ClientAdress.model';
import { ClientadressService } from '../clientadress.service';

@Component({
  selector: 'app-clientadresscreate',
  templateUrl: './clientadresscreate.component.html',
  styleUrls: ['./clientadresscreate.component.scss']
})
export class ClientadresscreateComponent implements OnInit {
  clientadress: ClientAdress = new ClientAdress();
  id: any;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  constructor(
    private modalService: NgbModal, public activeModal: NgbActiveModal,private spinner: NgxSpinnerService,
    private service: ClientadressService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
  }

  save() {
    if (!this.clientadress.adress)
    {
      return this.alertService.info(
        'Todos los campos son obligatorios',
        'Informacion'
      );
    }
    this.spinner.show();
    this.clientadress.idCliente = this.id;
    this.service.createClientAdress(this.clientadress).subscribe(
      (resp) => {
        const tk = () => this.notifyParent.emit();
        setTimeout(tk, 1500);
        this.spinner.hide();
        this.alertService.success('Direccion creada con exito','Creada');
        this.activeModal.close();
      },
      (error) => {
        this.spinner.hide();
        this.alertService.warning(error.error);
        this.activeModal.close();
      }
    );
  }

  closeModal() {
    this.activeModal.close();
  }
}
