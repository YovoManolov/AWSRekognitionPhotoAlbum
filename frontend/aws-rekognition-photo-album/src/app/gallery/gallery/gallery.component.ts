import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImageService } from 'src/app/image/shared/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnChanges {
  title = 'Recent Photos';
  @Input() filterBy: string = 'all';
  visibleImages: any[] = [];

  constructor(private imageService: ImageService) {
    this.visibleImages = this.imageService.getImages();
  }

  ngOnChanges(): void {
    this.visibleImages = this.imageService.getImages();
  }

  ngOnInit(): void {}
}
