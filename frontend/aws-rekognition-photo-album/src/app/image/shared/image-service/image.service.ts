import { Injectable } from '@angular/core';
import { ImageAwsService } from './aws/image-aws.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  visibleImages: any[] = [];
  constructor(
    private imageAwsService: ImageAwsService
  ) { }
  getImages() {
    return this.visibleImages = IMAGES.slice(0);
    //this.imageAwsService.getAwsImages()
  }

  getImagesByCategory(category: string) {
    this.visibleImages = IMAGES.slice(0).filter(image => image.category == category);
    return this.visibleImages
  }

  getImagesById(id: number) {
    return this.visibleImages = IMAGES.slice(0).filter(image => image.id == id);
  }

}

const IMAGES = [
  {
    "id": 1,
    "category": "cars",
    "caption": "View from a boat",
    "url": "assets/resources/cars/1.png"
  },
  {
    "id": 2,
    "category": "cars",
    "caption": "View from a boat",
    "url": "assets/resources/cars/2.png"
  },
  {
    "id": 3,
    "category": "cars",
    "caption": "View from a boat",
    "url": "assets/resources/cars/3.png"
  },
  {
    "id": 4,
    "category": "cars",
    "caption": "View from a boat",
    "url": "assets/resources/cars/4.png"
  },
  {
    "id": 5,
    "category": "cars",
    "caption": "View from a boat",
    "url": "assets/resources/cars/5.png"
  },
  {
    "id": 6,
    "category": "faces",
    "caption": "View from a boat",
    "url": "assets/resources/faces/1.png"
  },
  {
    "id": 7,
    "category": "faces",
    "caption": "View from a boat",
    "url": "assets/resources/faces/2.png"
  },
  {
    "id": 8,
    "category": "faces",
    "caption": "View from a boat",
    "url": "assets/resources/faces/3.png"
  },
  {
    "id": 9,
    "category": "faces",
    "caption": "View from a boat",
    "url": "assets/resources/faces/4.png"
  },
  {
    "id": 10,
    "category": "faces",
    "caption": "View from a boat",
    "url": "assets/resources/faces/5.png"
  },
  {
    "id": 11,
    "category": "mountains",
    "caption": "View from a boat",
    "url": "assets/resources/mountain/1.png"
  },
  {
    "id": 12,
    "category": "mountains",
    "caption": "View from a boat",
    "url": "assets/resources/mountain/2.png"
  },
  {
    "id": 13,
    "category": "mountains",
    "caption": "View from a boat",
    "url": "assets/resources/mountain/3.png"
  },
  {
    "id": 14,
    "category": "mountains",
    "caption": "View from a boat",
    "url": "assets/resources/mountain/4.png"
  },
  {
    "id": 15,
    "category": "mountains",
    "caption": "View from a boat",
    "url": "assets/resources/mountain/5.png"
  },
  {
    "id": 16,
    "category": "watches",
    "caption": "View from a boat",
    "url": "assets/resources/watches/1.png"
  },
  {
    "id": 17,
    "category": "watches",
    "caption": "View from a boat",
    "url": "assets/resources/watches/2.png"
  },
  {
    "id": 18,
    "category": "watches",
    "caption": "View from a boat",
    "url": "assets/resources/watches/3.png"
  },
  {
    "id": 19,
    "category": "watches",
    "caption": "View from a boat",
    "url": "assets/resources/watches/4.png"
  },
  {
    "id": 20,
    "category": "watches",
    "caption": "View from a boat",
    "url": "assets/resources/watches/5.png"
  }
]

