import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user-service/user.service';
import { FileUploadService } from './upload-service/file-upload.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {

  imageSrc: string | undefined;
  fullFilePath: string | undefined;
  userEmail!: string;

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    (document.getElementById('submitUploadButton') as HTMLInputElement).disabled = true;
    this.userEmail = this.userService.getUserEmail();
  }

  get f() {
    return this.myForm.controls;
  }

  selecetdFile!: File;
  fileUrl!: string;

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
    (document.getElementById('submitUploadButton') as HTMLInputElement).disabled = false;
  }

  async upload() {
    this.fullFilePath = this.myForm.value.file
    this.fileUploadService.upload(this.fullFilePath, this.imageSrc, this.userEmail)
    await new Promise(f => setTimeout(f, 3000));
    this.router.navigateByUrl('awsRekognitionPhotoAlbum/images/all');
  }

}