import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService, User} from "./http.service";

@Component({
    selector: "profile-content",
    template: `
    <div class="main-space">
        <div class="main-container">
            <div class="row">
                <div class="row">              
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image">
                                <image-container [userId]="getUserId()" ></image-container>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m8">
                        <h1 class="title">{{getUser().getName()}}</h1>
                        <h4 *ngIf="isTeacher()" class="subtitle">Professor</h4>
                        <h4 *ngIf="isStudent()" class="subtitle">Estudante de {{getUser().getCourse()}} do {{getUser().getSemester()}}</h4>
                        <br/>
                    </div> 
                </div>
                <div class="row">
                    <p class="title">Nome Completo:  {{getUser().getName()}}</p>
                    <p class="title">Sexo:  {{getUser().getSex()}}</p>
                    <p class="title">CPF:  {{getUser().getCpf()}}</p>
                    <p class="title">RG:  {{getUser().getRg()}}</p>
                </div>
            </div><!-- end main row -->
        </div>
    </div>
    `
})
export class ProfileContentComponent {

    getUser() : ProfileUser {
      return new ProfileUser(HttpService.user);
    }

    getUserId(): string {
        return HttpService.user.id
    }

    isTeacher() : boolean {
        return HttpService.user.userType == "teacher";
    }

    isStudent() : boolean {
        return HttpService.user.userType == "student";
    }
}

export class ProfileUser implements User {
  name: string;
  id: string;
  email: string;
  userType: string;
  token: string;
  "picture-url": string;
  course: string;
  semester: string;
  cpf: string;
  rg: string;
  "num-usp": string;
  sex: string;


  constructor(user: User) {
    this.name = user.name;
    this.userType = user.userType;
    this.id = user.id;
    this.sex = user.sex;
    this.course = user.course;
    this.semester = user.semester;
    this.email = user.email;
    this["picture-url"] = user["picture-url"];
    this["num-usp"] = user["num-usp"];
    this.token = user.token;
  }
  getName(): string {
    return this.name;
  }

  getPictureUrl() : string {
    return this["picture-url"];
  }
  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getUserType(): string {
    return this.userType;
  }
  getToken(): string {
    return this.token;
  }

  getCourse(): string {
    return this.course;
  }

  getSemester(): string {
    return this.semester;
  }

  getCpf(): string {
    return this.cpf;
  }

  getRg(): string {
    return this.rg;
  }

  getSex(): string {
    return this.sex;
  }
}
