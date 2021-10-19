import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { UploadImageComponent } from './image/upload-image/upload-image.component';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'awsRekognitionPhotoAlbum/images/all', pathMatch: 'full' },
  { path: 'awsRekognitionPhotoAlbum/images/:filterParam', component: GalleryComponent },
  { path: 'awsRekognitionPhotoAlbum/uploadImage', component: UploadImageComponent },
  { path: 'awsRekognitionPhotoAlbum/user/signup', component: SignupComponent },
  { path: 'awsRekognitionPhotoAlbum/user/signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } export const
  RoutingComponent = {}

