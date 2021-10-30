import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/image/image-service/image.service';
import { Image } from 'src/app/models/image/image.module';
import { Label } from 'src/app/models/labels/label.module';
import { UserService } from 'src/app/user-service/user.service';

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
    private imageService: ImageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.filterParam = params['filterParam'];
    });

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

  loadImagesByLabel(label: String) {
    this.imageService.getImagesByLabel(label).subscribe((images: Image[]) => {
      this.visibleImages = images
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

  async deleteObjectById(imageUrl?: string) {
    if (imageUrl != undefined) {
      var fileKey = imageUrl.split("/").pop();
      this.imageService.delete(fileKey).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      this.reloadCurrentPage();
    }
  }

  async reloadCurrentPage() {
    await new Promise(f => setTimeout(f, 3000));
    this.router.navigateByUrl(this.router.url).then(() => {
      window.location.reload();
    });
  }
}

