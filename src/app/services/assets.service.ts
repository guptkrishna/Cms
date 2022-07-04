import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Assets, AssetsUpdate } from '../models/assets-model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  assets!: Assets;

  constructor(private http: HttpClient) {}

  postAssets(comp: Assets) {
    return this.http.post(environment.API_URL + 'Assets', comp);
  }

  getAssets() {
    return this.http.get<any>(environment.API_URL + 'Assets');
  }
  getBuilding() {
    return this.http.get<any>(environment.API_URL + 'Building');
  }

  putAssets(comp: AssetsUpdate) {
    return this.http.put(environment.API_URL + 'Assets/' + comp.id, comp );
  }

  deleteAssets(id: number) {
    return this.http.delete(environment.API_URL + 'Assets/' + id )
  }
}
