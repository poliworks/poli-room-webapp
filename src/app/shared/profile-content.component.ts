import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService} from "./http.service";

@Component({
    selector: "profile-content",
    template: `
    <div class="main-space">
        <div class="main-container">
            <div class="row">
                <div class="col s12 m4">
                  <div class="card">
                    <div class="card-image">
                      <!--<img src="http://www.hintfilmiizle.com/uploads/uye/avatar/0.jpg">-->
                      <image-container [userId]="getUserId()" ></image-container>
                    </div>
                  </div>
                </div>
                <div class="col s12 m8">
                    <h1 class="title">Nome</h1>
                    <h4 class="subtitle">Sobrenome</h4>
                    <h5 class="subtitle">Professor</h5>
                    <br/>
                </div> 
            </div><!-- end main row -->
        </div>
    </div>
    `
})
export class ProfileContentComponent {

    getUserId(): string {
        return HttpService.user.id
    }

}
