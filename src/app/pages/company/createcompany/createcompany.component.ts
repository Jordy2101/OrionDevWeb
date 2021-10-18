import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/companyservices.service';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.scss']
})
export class CreatecompanyComponent implements OnInit {
  item: Company = new Company();
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(  public activeModal: NgbActiveModal,
    private services: CompanyService,private spinner: NgxSpinnerService,
    private alertService: AlertService) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close();
  }

  save() {
    if (
      !this.item.name ||
      !this.item.rnc
    ) {
      return this.alertService.info(
        'Todos los campos son obligatorios',
        'Informacion'
      );
    }
    this.spinner.show();
    this.services.createCompany(this.item).subscribe(
      (resp) => {
        const tk = () => this.notifyParent.emit();
        setTimeout(tk, 1500);
        this.spinner.hide();
        this.alertService.success('Empresa creada con exito','Creado');
        this.activeModal.close();
      },
      (error) => {
        this.spinner.hide();
        this.alertService.warning(error.error);
        this.activeModal.close();
      }
    );
  }
}
