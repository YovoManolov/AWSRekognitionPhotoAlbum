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
  visibleLabels: Array<String> = [];
  filterParam: string = "";

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.filterParam = params['filterParam'];
    });
    this.route.queryParams.subscribe(params => console.log('queryParams', params['st']));
    if (this.filterParam === "all") {
      this.loadImages();
    } else {
      this.loadImagesByLabel(this.filterParam)
    }
  }

  loadImages() {
    this.imageService.getAll().subscribe((allImages: Image[]) => {
      this.visibleImages = allImages
      this.loadAllLabels();
    },
      error => {
        console.log(error);
      });
  }

  loadAllLabels() {
    let labelNames!: Array<String>;
    if (this.visibleImages != undefined && this.visibleImages.length > 0) {
      for (let image of this.visibleImages) {
        let imageLabels = image.Labels;
        if (imageLabels != undefined) {
          labelNames = this.getLabelNamesFromLabelObject(imageLabels)
          this.visibleLabels = this.visibleLabels.concat(labelNames);
        }
      }
      let setOfLabels = new Set(this.visibleLabels);
      this.visibleLabels = Array.from(setOfLabels);
    }
  }

  getLabelNamesFromLabelObject(labels: Array<Label>) {
    var labelNames: string[] = new Array()
    for (let label of labels) {
      if (label.Name !== "") {
        labelNames.push(label.Name!)
      }
    }
    return labelNames;
  }

  loadImagesByLabel(label: String) {
    this.imageService.getImagesByLabel(label).subscribe((images: Image[]) => {
      this.visibleImages = images
      this.loadAllLabels();
    },
      error => {
        console.log(error);
      });
  }


  loadCarImages() {
    this.imageService.getImagesByLabel("car").subscribe((carImages: Image[]) => {
      this.visibleImages = carImages
    },
      error => {
        console.log(error);
      });
  }


  loadFaceImages() {
    this.imageService.getImagesByLabel("face").subscribe((faceImages: Image[]) => {
      this.visibleImages = faceImages
    },
      error => {
        console.log(error);
      });
  }


  loadNatureImages() {
    this.imageService.getImagesByLabel("nature").subscribe((natureImages: Image[]) => {
      this.visibleImages = natureImages
    },
      error => {
        console.log(error);
      });
  }


  loadWatchImages() {
    this.imageService.getImagesByLabel("watch").subscribe((watchImages: Image[]) => {
      this.visibleImages = watchImages
    },
      error => {
        console.log(error);
      });
  }

}
