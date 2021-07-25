import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ImageDetailComponent } from './image/image-detail/image-detail.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, GalleryComponent, ImageDetailComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
