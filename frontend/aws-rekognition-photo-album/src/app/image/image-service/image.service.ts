import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  visibleImages: any[] = [];
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/images`);
  }

  getImagesByLabel(label: String): Observable<any> {
    return this.http.get(`${baseUrl}/images/label/${label}`);
  }

  getImagesByUserAndLabel(userEmail: String, label: String): Observable<any> {
    return this.http.get(`${baseUrl}/images/user/${userEmail}/label/${label}`);
  }

  delete(fileKey: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${fileKey}`);
  }

}
