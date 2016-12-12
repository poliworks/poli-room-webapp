import { Component } from '@angular/core';
import { Router,
    NavigationExtras } from '@angular/router';

@Component({
    template: `
    <side-nav></side-nav>
    <profile-content></profile-content>
    `
})
export class ProfileComponent { }
