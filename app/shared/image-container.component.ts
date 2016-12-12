import {Component, ElementRef} from '@angular/core'
import {HttpService} from "./http.service";

@Component({
    selector: 'image-container',
    template: `
        <input type="file" (change)="changeListner($event)" />
        <img class="image" src="http://www.hintfilmiizle.com/uploads/uye/avatar/0.jpg"/>
    `
})
export class ImageContainerComponent {
    constructor(private element: ElementRef, private http: HttpService) {}
    uploadedImage : File;
    changeListner(event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        reader.onload = function(e) {
            console.log("onLoad!");
            console.log(HttpService.discovery["upload_profile_image"].url);
            var formData = new FormData();
            formData.append("user_id", HttpService.user.id);
            formData.append("profile_image", this.uploadedImage);
            this.http.uploadImage(HttpService.discovery["upload_profile_image"], formData);

            var src = e.target.result;
            image.src = src;

        };
        this.uploadedImage = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
    }
}