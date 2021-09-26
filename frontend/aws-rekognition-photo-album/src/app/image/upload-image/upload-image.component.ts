import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../image-service/upload-service/file-upload.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {

  selecetdFile: File | undefined;
  fileUrl: string | undefined;

  constructor(private fileUploadService: FileUploadService) { }

  onFileUpload(event: any) {
    this.selecetdFile = event.target.files[0]
  }

  upload() {
    //URL.createObjectURL(this.selecetdFile?.name);
    this.fileUrl = this.selecetdFile?.name;
    if (this.fileUrl !== undefined) {
      this.fileUploadService.uploadImage(this.fileUrl);
      console.log(this.fileUrl);
    }
  }

}
