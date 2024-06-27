import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  data = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.data).subscribe(
      (response: any) => {
        if (response.message === "Login Successful") {
          localStorage.setItem('wealthuser', JSON.stringify(response.response));
          this.router.navigate(['/home']);
        } else if (response.message === "Bad Credentials") {
          alert("Bad Credentials!! Check your Password");
        } else {
          alert("Email Not Exist");
        }
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}
