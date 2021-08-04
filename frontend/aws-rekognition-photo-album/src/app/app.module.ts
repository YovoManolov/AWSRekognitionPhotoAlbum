import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ImageFilterPipe } from './image/shared/filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ImageDetailComponent } from './image/image-detail.component';
import { appRoutes } from 'src/routs';
import { RouterModule } from '@angular/router';
import { ImageService } from './image/shared/image.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    ImageDetailComponent,
    ImageFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
  providers: [ImageService, ImageFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
