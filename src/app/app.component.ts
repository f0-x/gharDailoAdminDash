import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-dashboard';

    constructor(public authService: AuthService, private router: Router) {

  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login'])
    })
  }

  isLoggedIn():boolean {
    
    return (localStorage.getItem('user') === null)? false:true;
  }
}
