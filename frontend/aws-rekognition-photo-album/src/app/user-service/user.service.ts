import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

const baseUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private socialUser!: SocialUser;
  constructor(private socialAuthService: SocialAuthService) { }

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

