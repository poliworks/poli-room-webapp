import {Component, OnInit, AfterViewInit}        from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';
import {HttpService} from "../shared/http.service";
import {Response} from "@angular/http";

declare var jQuery: any;

@Component({
    template: `
      <div class="container">
        <div class="row">
          <div class="col m6 offset-m3">
            <div class="card brand">
              <div class="card-content white-text">
                <span class="card-title">Registro</span>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="name" type="text" class="validate" [(ngModel)]="name">
                    <label for="" class="white-text">Name</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="email" type="text" class="validate" [(ngModel)]="email">
                    <label for="" class="white-text">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="email" type="text" class="validate" [(ngModel)]="num_usp">
                    <label for="" class="white-text">Número USP</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="password" type="password" class="validate" [(ngModel)]="password">
                    <label for="password" class="white-text">Password</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="course" type="text" class="validate" [(ngModel)]="course">
                    <label for="" class="white-text">Curso/Departamento</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="semester" type="number" class="validate" [(ngModel)]="semester">
                    <label for="" class="white-text">Semestre</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="name" type="text" class="validate" [(ngModel)]="cpf">
                    <label for="" class="white-text">CPF</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="name" type="text" class="validate" [(ngModel)]="rg">
                    <label for="" class="white-text">RG</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <select id="nr-select-userType" name="userType">
                       <option *ngFor="let type of getUserTypes()" [ngValue]="userTypes[type]">{{type}}</option>
                     </select>
                    <label for="" class="white-text">Tipo do Usuário</label>
                  </div>
                </div>
                <a id="loginSubmit" class="btn waves-effect waves-light indigo lighten-1 submit-button" (click)="register()">Submit
                  <i class="material-icons right">send</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
})
export class RegisterFormComponent implements AfterViewInit{

    email: string;
    password: string;
    name: string;
    course: string;
    semester: number;
    userType: string;
    cpf: string;
    num_usp: string;
    rg: string;
    userTypes = {"Aluno": "student", "Professor": "teacher"};

    constructor (private http: HttpService, private router: Router) {}

    ngAfterViewInit(): void {
        jQuery("select").material_select();
    }

    getUserTypes() {
        return Object.keys(this.userTypes);
    }

    register() {
      this.userType = this.userTypes[jQuery('.select-dropdown')[0].value];
      console.log(this.userType);
      this.http.req({
          url: "register_user", replaceMap: {userType: this.userType}, body: this.getRegisterMap(), handler: this.makeRegister.bind(this)
      })
    }

  getRegisterMap(): Object {
    var commonMap = {
      email: this.email,
      password: this.password,
      name: this.name,
      cpf: this.cpf,
      rg: this.rg,
      'num-usp': this.num_usp,
      course: this.course,
      semester: this.semester,
      "picture-url": "https://s3-sa-east-1.amazonaws.com/poli-room/users/default.jpg"
    };
    if (this.userType == "student") {
      return Object.assign(commonMap, {course: this.course, semester: this.semester})
    } else {
      return Object.assign(commonMap, {department: this.course})
    }
  }

    makeRegister(response: Response) {
        console.log(response);
        let us = Object.assign(response.json(), {userType: this.userType});
        HttpService.setUser(us);
        this.router.navigate(["/room", 1])
    }

}
