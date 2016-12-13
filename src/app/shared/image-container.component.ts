import {Component, ElementRef, Input} from '@angular/core'
import {HttpService} from "./http.service";

@Component({
    selector: 'image-container',
    template: `
        <input type="file" (change)="changeListner($event)" />
        <img class="image" src="{{HttpService.user.picture_url}}"/>
    `
})

export class ImageContainerComponent {

    constructor(private element: ElementRef, private http: HttpService) {}

    uploadedImage: File;
    @Input() userId: string;

    changeListner(event: any) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');

        reader.onload = e => {
            console.log("onLoad!");
            console.log(HttpService.discovery["upload_profile_image"].url);
            var formData = new FormData();
            formData.append("user_id", HttpService.user.id);
            formData.append("file", this.uploadedImage);
            this.http.uploadImage({url: "upload_profile_image", replaceMap: {id: this.userId, userType: "student"}, handler: null}, formData);

            var src = reader.result;
            image.src = src;
        };
        this.uploadedImage = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
    }
}
