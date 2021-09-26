import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const uploadUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum/uploadImage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) { }

  public uploadImage(imageUrl: string): Observable<string | any> {
    const formData: FormData = new FormData();
    formData.append("filePath", imageUrl)

    return this.httpClient.post(uploadUrl, formData).pipe(
      catchError(
        (err) => {
          console.error(err);
          throw err;
        }
      )
    );
  }

}
