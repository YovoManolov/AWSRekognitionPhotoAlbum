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
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { GuardService } from './login/guard-service/guard.service';

const GOOGLE_CLIENT_ID = environment.google_client_Id
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    GalleryComponent,
    ImageFilterPipe,
    UploadImageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              GOOGLE_CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    GuardService,
    ImageService,
    FileUploadService,
    ImageFilterPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
