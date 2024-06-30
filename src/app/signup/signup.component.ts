
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  data = {
    username: '',
    email: '',
    password: '',
    gender:'',
    bankName:'',
    bankAccountNumber:'',
    totalWealth:''



  };
  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.data).subscribe(
      (response: any) => {
        if (response.message === "Email Already Exist") {
          alert("Email Already Exists");
        } 
        else{
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

}
