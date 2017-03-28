import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    username: String;
    email: String;
    password: String;

  constructor(private authService:AuthService, private router:Router, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

    onLoginSumbit(){
        const user = {
            username: this.username,
            email: this.username,
            password: this.password
        }
        
        this.authService.authenticateUser(user).subscribe(data => {
            if(data.success){
               this.authService.storeUserData(data.token, data.user);
               this.flashMessage.show('Login successful', {cssClass: 'alert-success'});
                this.router.navigate(['dashboard']); 
            }else{
                this.flashMessage.show('Username or password incorrect', {cssClass: 'alert-danger'});
                this.router.navigate(['login']);
            }
        });
    }
    
    
    forgotPassword(){
        console.log('forgotpassword');
    }
    
    
    
}
