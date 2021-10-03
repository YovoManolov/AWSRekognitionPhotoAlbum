import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { FileUploadService } from '../image-service/upload-service/file-upload.service';
import { String, StringBuilder } from 'typescript-string-operations';

const uploadUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum/images';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  imageSrc: string | undefined;
  fullFilePath: string | undefined;

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ) { }

  get f() {
    return this.myForm.controls;
  }

  selecetdFile: File | undefined;
  fileUrl: string | undefined;

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }

  upload() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { "headers": headers };
    this.fullFilePath = this.myForm.value.file

    // let data = {
    //   base64Image: this.imageSrc,
    //   fullFilePath: this.fullFilePath
    // }

    let formData: any = new FormData();
    formData.append("base64Image", this.imageSrc);
    formData.append("fullFilePath", this.fullFilePath);
    console.log(formData)
    return this.http.post(uploadUrl, formData).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}