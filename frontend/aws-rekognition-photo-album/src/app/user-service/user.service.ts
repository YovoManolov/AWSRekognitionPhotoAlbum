import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ImageService } from '../image/image-service/image.service';
import { User } from '../models/user/user.module';

const baseUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private socialUser!: SocialUser;
  private imageService!: ImageService;
  private user!: User;
  constructor(private socialAuthService: SocialAuthService
  ) { }

  getUserType(userEmail: string): string {
    this.imageService.getUserType(userEmail).subscribe((user: User) => {
      this.user = user
    },
      error => {
        console.log(error);
      });
    if (this.user.Type !== undefined)
      return this.user.Type;
    else return "user"
  }

  getUserEmail(): string {
    let socialUser = this.getSocialUser()
    return socialUser.email;
  }

  private getSocialUser(): SocialUser {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
    });
    return this.socialUser;
  }


}

