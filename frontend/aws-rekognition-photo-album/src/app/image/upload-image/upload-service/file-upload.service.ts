import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const uploadUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum/images';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  public uploadImage(value: any): Observable<string | any> {
    return this.http.post(uploadUrl, value);
  }

  public upload(fullFilePath: any, base64ImageSrc: any, userEmail: any) {
    let formData: any = new FormData();
    formData.append("base64Image", base64ImageSrc);
    formData.append("fullFilePath", fullFilePath);
    formData.append("userEmail", userEmail)
    return this.http.post(uploadUrl, formData).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
