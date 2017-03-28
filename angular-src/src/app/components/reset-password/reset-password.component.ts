import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    username: String;
    email: String;
    password: String;
    newpassword: String;
    
  constructor(private authService:AuthService, private router:Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
    
    resetPassword(){
          const user = {
            username: this.username,
            email: this.username,
            password: this.password,
            newpassword: this.newpassword  
          }
          
          if(user.username == undefined || user.username == "" || 
             user.email == undefined || user.email == "" ||
             user.password == undefined || user.password == "" || 
             user.newpassword == undefined || user.newpassword == ""){
              this.flashMessage.show("Please enter all details below", {cssClass: 'alert-danger'})
          }else{
               this.authService.resetpassword(user).subscribe(data => {
                    if(data.success){
                        console.log(user);
                        this.flashMessage.show(data.msg, {cssClass: 'alert-success'});
                    }else{
                        this.flashMessage.show(data.msg, {cssClass: 'alert-danger'});
                    }
                });
          }
    }

}
