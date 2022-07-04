import { Injectable } from '@angular/core';
import { Company, CompanyUpdate } from '../models/company-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  company!: Company;


  constructor(private http: HttpClient) {}

  url_ = 'assets/store.json';

  getall(): any{
    return this.http.get<any>(this.url_);
  }

  postCompany(comp: Company) {
    return this.http.post(environment.API_URL + 'Company', comp);
  }

  getCompany() {
    return this.http.get<any>(environment.API_URL + 'Company');
  }

  putCompany(comp: CompanyUpdate) {
    return this.http.put(environment.API_URL + 'Company/' + comp.id, comp );
  }

  deleteCompany(id: number) {
    return this.http.delete(environment.API_URL + 'Company/' + id )
  }

}

