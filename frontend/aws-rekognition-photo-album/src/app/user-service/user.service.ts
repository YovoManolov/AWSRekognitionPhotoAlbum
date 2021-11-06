import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

const baseUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private socialUser!: SocialUser;
  constructor(private socialAuthService: SocialAuthService) { }

  public getSocialUser(): SocialUser {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
    });
    return this.socialUser;
  }

}

