import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Complex,ComplexUpdate } from '../models/complex-model';

@Injectable({
  providedIn: 'root'
})
export class ComplexService {

  complex!: Complex;

  constructor(private http: HttpClient) {}

  postComplex(comp: Complex) {
    return this.http.post(environment.API_URL + 'Complex', comp);
  }

  getComplex() {
    return this.http.get<any>(environment.API_URL + 'Complex');
  }

  putComplex(comp: ComplexUpdate) {
    return this.http.put(environment.API_URL + 'Complex/' + comp.id, comp );
  }
  getcompany():any{
    return this.http.get<any>(environment.API_URL+'Company')
  }

  deleteComplex(id: number) {
    return this.http.delete(environment.API_URL + 'Complex/' + id )
  }
}
