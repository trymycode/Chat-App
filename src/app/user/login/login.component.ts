import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;

  constructor( public appService: AppService, public router: Router,private cookieService: CookieService ) { }

  ngOnInit() {
  }
  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp

  public signinFunction: any = () => {

    if (!this.email) {
      // this.toastr.warning('enter email')
      alert("Enter email");

    } else if (!this.password) {

      // this.toastr.warning('enter password')
      alert("Enter password");

    } else {

      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            console.log(apiResponse)

             this.cookieService.set('authtoken', apiResponse.data.authToken);
            
             this.cookieService.set('receiverId', apiResponse.data.userDetails.userId);
          
             this.cookieService.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
           
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
             alert("Logged in successfully");
             this.router.navigate(['/chat']);

          } else {

            // this.toastr.error(apiResponse.message)
            alert("ERROR"+ apiResponse.message);

          }

        }, (err) => {
          // this.toastr.error('some error occured')
          alert("Some error occured!");
        });

    } // end condition

  } // end signinFunction

  

}
