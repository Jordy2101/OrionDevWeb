import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from 'src/environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  headers = new HttpHeaders()
    .set('ApiKey', 'CAj/MmgSiBsmrO0P5wSGM5HAQ39ulpF7FcwwHMaUGyY');
  constructor(private http: HttpClient) { }



  getPage(filter: any, page: number) {
    return this.http.get<any>(endpoint.client + `/GetPaged?PageNumber=${page}&pageSize=10&keyword=${filter.keyword}`, { responseType: "json", headers: this.headers });
  }

  getAllClient() {
    return this.http.get<any>(endpoint.client, { responseType: "json", headers: this.headers });
  }

  getClientById(id: number) {
    return this.http.get<any>(endpoint.client + `/${id}`, { responseType: "json", headers: this.headers });
  }

  createClient(item: Client) {
    return this.http.post<any>(endpoint.client, item, { responseType: "json", headers: this.headers });
  }

  updateClient(item: Client) {
    return this.http.put<any>(endpoint.client, item, { responseType: "json", headers: this.headers });
  }

  inactiveClient(id: number) {
    return this.http.delete<any>(endpoint.client + `/${id}`, { responseType: "json", headers: this.headers });
  }
}
