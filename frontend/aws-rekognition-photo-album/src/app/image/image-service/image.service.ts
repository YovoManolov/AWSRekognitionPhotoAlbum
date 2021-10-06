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

  getImagesByLabel(label: String): Observable<any> {
    return this.http.get(`${baseUrl}/label/${label}`);
  }

  update(id: string, data: any) {
    return this.http.put(`${baseUrl}/update/`, data);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
