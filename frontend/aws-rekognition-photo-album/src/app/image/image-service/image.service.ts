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

  getImagesByLabel(label: string): Observable<any> {
    return this.http.get(`${baseUrl}/images/label/${label}`);
  }

  getImagesByUserAndLabel(userEmail: string, label: string): Observable<any> {
    return this.http.get(`${baseUrl}/images/user/${userEmail}/label/${label}`);
  }

  getUserType(userEmail: string): Observable<any> {
    return this.http.get(`${baseUrl}/getUserType/${userEmail}`);
  }

  delete(fileKey: any): Observable<any> {
    return this.http.delete(`${baseUrl}/images/${fileKey}`);
  }

}
