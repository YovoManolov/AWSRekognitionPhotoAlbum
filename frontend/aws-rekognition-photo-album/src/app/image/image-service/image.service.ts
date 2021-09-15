import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum/images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  visibleImages: any[] = [];
  constructor(private http: HttpClient) { }

  // create(data) {
  //   return this.http.post(`${baseUrl}/create`, data);
  // }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }

  getCarImages(): Observable<any> {
    return this.http.get(`${baseUrl}/label/car`);
  }

  getFaceImages(): Observable<any> {
    return this.http.get(`${baseUrl}/label/face`);
  }

  getNatureImages(): Observable<any> {
    return this.http.get(`${baseUrl}/label/nature`);
  }

  getWatchImages(): Observable<any> {
    return this.http.get(`${baseUrl}/label/watch`);
  }

  // getLandmarkById(_id: string): Observable<Image> {
  //   const url = `${baseUrl}/getOneById/${_id}`;
  //   return this.http.get<Image>(url);
  // }

  update(id: string, data: any) {
    return this.http.put(`${baseUrl}/update/`, data);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // getImages() {
  //   return this.visibleImages = IMAGES.slice(0);
  // }

  getImagesByCategory(category: string) {
    //   this.visibleImages = IMAGES.slice(0).filter(image => image.category == category);
    //   return this.visibleImages
  }

  // getImagesById(id: number) {
  //   return this.visibleImages = IMAGES.slice(0).filter(image => image.id == id);
  // }

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

