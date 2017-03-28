import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    username: String;
    email: String;
    
  constructor(private authService:AuthService, private router:Router, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }
    
    sendPasswordReset(){
          const user = {
            username: this.username,
            email: this.username,
          }
          
          if(user.username == undefined || user.email == undefined || user.username == "" || user.email == "") {
                this.flashMessage.show('Please enter your username or email', {cssClass: 'alert-danger'});
             }else{
                this.authService.forgotPassword(user).subscribe(data => {
                    if(data.success){
                        this.flashMessage.show(data.msg, {cssClass: 'alert-success'});
                    }else{
                        this.flashMessage.show(data.msg, {cssClass: 'alert-success'});
                    }
                });
            }
    }

}
