import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {  
    name: String;
    username: String;
    email: String;
    password: String;
    
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService,
              private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

    onRegisterSumbit(){
        const user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        }
        
        //Required fields
        if(!this.validateService.validateRegister(user)){
            this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger'});
            return false;
        }
        
        //validate email
        if(!this.validateService.validateEmail(user.email)){
            this.flashMessage.show('Please use a proper email', {cssClass: 'alert-danger'});
            return false;
        }
        
        //register user in database
        this.authService.registerUser(user).subscribe(data => {
            if(data.success){
               this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success'});
               this.router.navigate(['/login']); 
            }else{
               this.flashMessage.show('ops, something went wrong', {cssClass: 'alert-danger'});
               this.router.navigate(['/register']);  
            }
        });
    }
}
