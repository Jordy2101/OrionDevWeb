import { Company } from "../../company/models/company.model";
import { BaseEntity } from "../../core/baseentity.model";

export class Client extends BaseEntity {
  name: string;
  idCompany: number;
  companyDto: Company;
}
