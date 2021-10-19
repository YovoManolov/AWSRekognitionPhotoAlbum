import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  visibleImages: any[] = [];
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  signUp(data: any): Observable<any> {
    return this.http.post(
      baseUrl,
      JSON.stringify(data),
      { headers: this.headers }
    )


    return this.http.get(`${baseUrl}`);
  }

  signIn(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }

}

