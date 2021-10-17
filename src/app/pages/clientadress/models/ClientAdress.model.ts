import { BaseEntity } from '../../core/baseentity.model';
import { Client } from './../../client/models/client.model';
export class ClientAdress extends BaseEntity {
  idCliente?: number;
  adress: string;
  clientDto?: Client;
}
