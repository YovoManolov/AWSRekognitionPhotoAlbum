import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '../image-service/upload-service/file-upload.service';

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
    private fileUploadService: FileUploadService,
    private router: Router
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
    this.fullFilePath = this.myForm.value.file
    this.fileUploadService.upload(this.fullFilePath, this.imageSrc)
    this.router.navigateByUrl('awsRekognitionPhotoAlbum/images/all');
  }

}