import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

const baseUrl = 'http://localhost:8000/awsRekognitionPhotoAlbum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private socialUser!: SocialUser;
  constructor(private socialAuthService: SocialAuthService,
    private http: HttpClient) { }

  public getUserEmail(): string {
    return this.getSocialUser().email;
  }

  private getSocialUser(): SocialUser {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
    });
    return this.socialUser;
  }

  addNewUserIfDoesNotExist(userEmail: string) {
    let formData: any = new FormData();
    formData.append("userEmail", userEmail)
    return this.http.post(`${baseUrl}/addNewUserIfDoesNotExist`, formData).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}

