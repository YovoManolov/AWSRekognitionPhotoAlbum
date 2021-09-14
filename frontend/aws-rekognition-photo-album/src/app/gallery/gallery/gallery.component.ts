import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/image/image-service/image.service';
import { Image } from 'src/app/models/image/image.module';
import { Label } from 'src/app/models/labels/label.module';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  title = 'Recent Photos';
  @Input() filterBy: string = 'all';
  #visibleImages: any[] = [];
  visibleImages: Array<Image> = [];
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
        this.loadImages();
        break;
      case "cars":
        this.loadCarImages();
        break;
      case "faces":
        this.loadFaceImages();
        break;
      case "nature":
        this.loadNatureImages();
        break;
      case "watches":
        this.loadCarImages();
        break;
    }
  }

  loadImages() {
    this.imageService.getAll().subscribe((allImages: Image[]) => {
      this.images = allImages
    },
      error => {
        console.log(error);
      });
  }

  loadCarImages() {
    this.imageService.getCarImages().subscribe((carImages: Image[]) => {
      this.images = carImages
    },
      error => {
        console.log(error);
      });
  }


  loadFaceImages() {
    this.imageService.getCarImages().subscribe((carImages: Image[]) => {
      this.images = carImages
    },
      error => {
        console.log(error);
      });
  }


  loadNatureImages() {
    this.imageService.getCarImages().subscribe((carImages: Image[]) => {
      this.images = carImages
    },
      error => {
        console.log(error);
      });
  }


  loadWatchImages() {
    this.imageService.getCarImages().subscribe((carImages: Image[]) => {
      this.images = carImages
    },
      error => {
        console.log(error);
      });
  }

}
