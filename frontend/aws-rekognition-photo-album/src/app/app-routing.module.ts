import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { UploadImageComponent } from './image/upload-image/upload-image.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './login/guard-service/guard.service';

const routes: Routes = [
  { path: 'awsRekognitionPhotoAlbum/login', component: LoginComponent },
  { path: '', redirectTo: 'awsRekognitionPhotoAlbum/images/all', pathMatch: 'full' },
  { path: 'awsRekognitionPhotoAlbum/images/:filterParam', component: GalleryComponent, canActivate: [GuardService] },
  { path: 'awsRekognitionPhotoAlbum/uploadImage', component: UploadImageComponent, canActivate: [GuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } export const
  RoutingComponent = {}

