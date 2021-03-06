import {Component, ElementRef, Input} from '@angular/core'
import {HttpService} from "./http.service";
import {ProfileUser} from "./profile-content.component";
import {Response} from "@angular/http";

@Component({
    selector: 'image-container',
    template: `
        <input type="file" (change)="changeListner($event)" />
        <img class="image" src="{{getUser().getPictureUrl()}}"/>
    `
})

export class ImageContainerComponent {

    private doneUpLoading(r: Response) {
      console.log("Done Uploading");
     this.http.refreshUser()
    }


    constructor(private element: ElementRef, private http: HttpService) {}

    uploadedImage: File;
    @Input() userId: string;

  getUser() : ProfileUser {
    return new ProfileUser(HttpService.user);
  }

    changeListner(event: any) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        reader.onload = e => {
            console.log("onLoad!");
            console.log(HttpService.discovery["upload_profile_image"].url);
            var formData = new FormData();
            formData.append("user_id", HttpService.user.id);
            formData.append("file", this.uploadedImage);
            this.http.uploadImage({url: "upload_profile_image", replaceMap: {id: this.userId, userType: "student"}, handler: this.doneUpLoading.bind(this)}, formData);

            var src = reader.result;
            image.src = src;
        };
        this.uploadedImage = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
    }
}
