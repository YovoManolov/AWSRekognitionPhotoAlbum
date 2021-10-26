import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ImageFilterPipe } from './image/image-filter-pipe/image-filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ImageService } from './image/image-service/image.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadService } from './image/image-service/upload-service/file-upload.service';
import { UploadImageComponent } from './image/upload-image/upload-image.component';
import { SignupComponent } from './users/signup/signup.component';
import { SigninComponent } from './users/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    ImageFilterPipe,
    UploadImageComponent,
    SignupComponent,
    SigninComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [ImageService, FileUploadService, ImageFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
