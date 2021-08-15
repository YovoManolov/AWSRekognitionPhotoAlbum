import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ImageFilterPipe } from './image/shared/image-filter-pipe/image-filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ImageService } from './image/shared/image-service/image.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    ImageFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [ImageService, ImageFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
