import { ClientAdress } from './../clientadress/models/ClientAdress.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientadressService {
  headers = new HttpHeaders()
    .set('ApiKey', 'CAj/MmgSiBsmrO0P5wSGM5HAQ39ulpF7FcwwHMaUGyY');
  constructor(private http: HttpClient) { }

  getPage(filter: any, page: number) {
    return this.http.get<any>(endpoint.clientadrees + `/GetPaged?PageNumber=${page}&pageSize=10&idclient=${filter.idclient}`, { responseType: "json", headers: this.headers });
  }

  createClientAdress(item: ClientAdress) {
    return this.http.post<any>(endpoint.clientadrees, item, { responseType: "json", headers: this.headers });
  }
}
