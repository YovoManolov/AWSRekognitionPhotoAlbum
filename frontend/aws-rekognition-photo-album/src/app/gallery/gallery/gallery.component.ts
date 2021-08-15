import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/image/shared/image-service/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  title = 'Recent Photos';
  @Input() filterBy: string = 'all';
  visibleImages: any[] = [];
  labelToFilter: string = "";

  constructor(private imageService: ImageService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.labelToFilter = params['pictureLabel'];
    });
    this.route.queryParams.subscribe(params => console.log('queryParams', params['st']));

    switch (this.labelToFilter) {
      case "all":
        this.visibleImages = this.imageService.getImages();
        break;
      case "cars":
        this.visibleImages = this.imageService.getImagesByCategory(this.labelToFilter);
        break;
      case "faces":
        this.visibleImages = this.imageService.getImagesByCategory(this.labelToFilter);
        break;
      case "mountains":
        this.visibleImages = this.imageService.getImagesByCategory(this.labelToFilter);
        break;
      case "watches":
        this.visibleImages = this.imageService.getImagesByCategory(this.labelToFilter);
        break;
    }

  }
}
