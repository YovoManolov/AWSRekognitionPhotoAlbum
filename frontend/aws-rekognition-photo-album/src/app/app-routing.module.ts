import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { UploadImageComponent } from './image/upload-image/upload-image.component';

const routes: Routes = [
  { path: '', redirectTo: 'awsRekognitionPhotoAlbum/images/', pathMatch: 'full' },
  { path: 'awsRekognitionPhotoAlbum/images/:filterParam', component: GalleryComponent },
  { path: 'awsRekognitionPhotoAlbum/uploadImage', component: UploadImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } export const
  RoutingComponent = {}

