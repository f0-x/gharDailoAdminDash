import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GharDailo Admin Portal';

    constructor(public authService: AuthService, private router: Router,
                private afAuth: AngularFireAuth) {

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
