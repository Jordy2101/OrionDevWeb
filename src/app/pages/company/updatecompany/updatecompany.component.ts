import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/companyservices.service';

@Component({
  selector: 'app-updatecompany',
  templateUrl: './updatecompany.component.html',
  styleUrls: ['./updatecompany.component.scss']
})
export class UpdatecompanyComponent implements OnInit {
  item: Company = new Company();
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  id: number;

  constructor(  public activeModal: NgbActiveModal,
    private services: CompanyService,private spinner: NgxSpinnerService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.getCompanyByid();
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
    this.services.updateCompany(this.item).subscribe(
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

  getCompanyByid() {
    this.services.getCompanyById(this.id).subscribe((res) => {
      this.item = res;
    });
  }
}
