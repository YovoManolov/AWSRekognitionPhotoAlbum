import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(
    private router: Router,
    public socialAuthService: SocialAuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.socialAuthService.authState.pipe(
      map((auth) => {
        if (auth === null || auth === undefined) {
          this.router.navigate(['/awsRekognitionPhotoAlbum/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
