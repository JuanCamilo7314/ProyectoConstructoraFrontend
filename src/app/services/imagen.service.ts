import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadModel } from '../modelos/load.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  entity = 'image';
  token: String = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.obtenerToken();
  }
  /**
   * Get record by id
   * @param id id to search
   */
  getRecordById(id: String,type: number): Observable<LoadModel> {
    return this.http.get<LoadModel>(`http://localhost:3000/files/${type}/${id}`);
  }

}
