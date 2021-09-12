import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/image/image-service/image.service';
import { Image } from 'src/app/models/image/image.module';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  title = 'Recent Photos';
  @Input() filterBy: string = 'all';
  visibleImages: any[] = [];
  images: Array<Image> = [];
  labelToFilter: string = "";

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.labelToFilter = params['pictureLabel'];
    });
    this.route.queryParams.subscribe(params => console.log('queryParams', params['st']));

    switch (this.labelToFilter) {
      case "all":
        this.imageService.getAll().subscribe((allImages: Image[]) => {
          this.images = allImages
        },
          error => {
            console.log(error);
          });
        //this.loadImages();
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

  loadImages() {

    this.landmarkService.getAll().subscribe((allLandmarks: Landmark[]) => {

      console.log(allLandmarks);
      this.landmarks = allLandmarks;

      this.landmarks.forEach(landmark => {
        this.allPlaces.push(landmark);
      });

    });

  }
}
