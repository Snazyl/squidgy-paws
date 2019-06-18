import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { IAppUser } from 'models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, 
    private router: Router, 
    private userService: UserService
    ) { }

  canActivate() {
    return this.authService.user$.pipe(
      switchMap(result => this.userService.get(result.uid)),
      map((userApp: IAppUser) => userApp.isAdmin)
    );
  }
}
