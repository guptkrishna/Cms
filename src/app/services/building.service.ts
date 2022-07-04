import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Building,BuildingUpdate } from '../models/building-model';


// export interface Company{
//   _id: string,
//   name: string

// }

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  
  building!: Building;

  constructor(private http: HttpClient) {}

  postBuilding(comp: Building) {
    return this.http.post(environment.API_URL + 'Building', comp);
  }

  getBuilding() {
    return this.http.get(environment.API_URL + 'Building');
  }
  getcomplex():any{
    return this.http.get<any>(environment.API_URL+'Complex');
  }
  getcompany():any{
    return this.http.get<any>(environment.API_URL+'Company');
  }

  putBuilding(comp: BuildingUpdate) {
    return this.http.put(environment.API_URL + 'Building/' + comp.id, comp );
  }

  deleteBuilding(id: number) {
    return this.http.delete(environment.API_URL + 'Building/' + id )
  }
}
