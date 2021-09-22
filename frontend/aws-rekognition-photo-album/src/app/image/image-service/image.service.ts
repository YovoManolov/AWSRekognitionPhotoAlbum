import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum/images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  visibleImages: any[] = [];
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }

  getCarImages(): Observable<any> {
    return this.http.get(`${baseUrl}/label/Car`);
  }

  getFaceImages(): Observable<any> {
    return this.http.get(`${baseUrl}/label/Face`);
  }

  getNatureImages(): Observable<any> {
    return this.http.get(`${baseUrl}/label/Nature`);
  }

  getWatchImages(): Observable<any> {
    return this.http.get(`${baseUrl}/label/Watch`);
  }

  update(id: string, data: any) {
    return this.http.put(`${baseUrl}/update/`, data);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
