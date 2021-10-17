import { endpoint } from './../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  headers = new HttpHeaders()
    .set('ApiKey', 'CAj/MmgSiBsmrO0P5wSGM5HAQ39ulpF7FcwwHMaUGyY');
  constructor(private http: HttpClient) { }

  getPage(filter: any, page: number) {
    return this.http.get<any>(endpoint.company + `/GetPaged?PageNumber=${page}&pageSize=10&keyword=${filter.keyword}`, { responseType: "json", headers: this.headers });
  }

  getAllCompany() {
    return this.http.get<any>(endpoint.company, { responseType: "json", headers: this.headers });
  }

  getCompanyById(id: number) {
    return this.http.get<any>(endpoint.company + `/${id}`, { responseType: "json", headers: this.headers });
  }

  createCompany(item: Company) {
    return this.http.post<any>(endpoint.company, item, { responseType: "json", headers: this.headers });
  }

  updateCompany(item: Company) {
    return this.http.put<any>(endpoint.company, item, { responseType: "json", headers: this.headers });
  }

  inactiveCompany(id: number) {
    return this.http.delete<any>(endpoint.company + `/${id}`, { responseType: "json", headers: this.headers });
  }
}
