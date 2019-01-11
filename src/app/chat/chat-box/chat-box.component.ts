import { AppService } from './../../app.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SocketService } from './../../socket.service';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {
  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;
  constructor(
    public AppService: AppService,
    public SocketService: SocketService,
    public router: Router,
    private cookieService: CookieService,
    vcr: ViewContainerRef
  ) 
  {
    this.receiverId = cookieService.get('receiverId');

    this.receiverName = cookieService.get('receiverName');
    
    // this.toastr.setRootViewContainerRef(vcr);
    alert("View container Reference:- "+ vcr);
 }

  ngOnInit() {
    this.authToken = this.cookieService.get('authtoken');

    this.userInfo = this.AppService.getUserInfoFromLocalstorage();

    this.checkStatus();

    this.verifyUserConfirmation();

    this.getOnlineUserList();
  }
  public checkStatus: any = () => {

    if (this.cookieService.get('authtoken') === undefined || this.cookieService.get('authtoken') === '' || this.cookieService.get('authtoken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus
  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList()

      });
      
    }
    public getOnlineUserList :any =()=>{

      this.SocketService.onlineUserList()
        .subscribe((userList) => {
  
          this.userList = [];
  
          for (let x in userList) {
  
            let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };
  
            this.userList.push(temp);          
  
          }
          
          console.log(this.userList);
  
        }); // end online-user-list
    }

}
