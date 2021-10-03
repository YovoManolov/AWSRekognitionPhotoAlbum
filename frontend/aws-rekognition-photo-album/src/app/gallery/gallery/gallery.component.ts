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
  visibleImages: Array<Image> = [];
  //visibleLabels: Array<Label> = [];
  filterParam: string = "";

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.filterParam = params['filterParam'];
    });
    this.route.queryParams.subscribe(params => console.log('queryParams', params['st']));

    switch (this.filterParam) {
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
        this.loadWatchImages();
        break;
    }
  }

  loadImages() {
    this.imageService.getAll().subscribe((allImages: Image[]) => {
      this.visibleImages = allImages
    },
      error => {
        console.log(error);
      });
  }

  // loadOnlyLabels() {
  //   this.imageService.getAll().subscribe((allImages: Image[]) => {
  //     for (let image of allImages) {
  //       let imageLabels = image.Labels;
  //       this.visibleLabels.concat(imageLabels);
  //     }
  //   },
  //     error => {
  //       console.log(error);
  //     });
  // }

  loadCarImages() {
    this.imageService.getCarImages().subscribe((carImages: Image[]) => {
      this.visibleImages = carImages
    },
      error => {
        console.log(error);
      });
  }


  loadFaceImages() {
    this.imageService.getFaceImages().subscribe((carImages: Image[]) => {
      this.visibleImages = carImages
    },
      error => {
        console.log(error);
      });
  }


  loadNatureImages() {
    this.imageService.getNatureImages().subscribe((carImages: Image[]) => {
      this.visibleImages = carImages
    },
      error => {
        console.log(error);
      });
  }


  loadWatchImages() {
    this.imageService.getWatchImages().subscribe((carImages: Image[]) => {
      this.visibleImages = carImages
    },
      error => {
        console.log(error);
      });
  }

}
