import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {HttpService} from "../shared/http.service";
import {Response} from "@angular/http";
import 'rxjs/add/operator/switchMap';

declare var jQuery: any;

@Component({
    selector: `room-content`,
    template: `
    <div class="main-space">
        <div class="main-container">
          <div class="row">
            <h1 class="title">{{this.room.name}}</h1>
            <h4 class="subtitle">{{this.room.building}}</h4>
            <h5 class="subtitle">{{this.room.department}}</h5>
            <br/>

            <div class="row">
              <room-events [roomId]="roomId" [eventChanges]="eventChanges"></room-events>
              <room-problems [roomId]="roomId" [problemChanges]="problemChanges"></room-problems>
            </div> <!-- end row of MANUTENÇÃO and PROXIMAS ATIVIDADES -->
            <div class="row">
              <room-features [roomId]="roomId" [featureChanges]="featureChanges"></room-features>
              <a class="modal-trigger waves-effect waves-light btn right" href="#new-feature-modal">Nova Feature</a>
            </div> <!-- FEATURES ROW -->
          </div> <!-- end main row -->
        </div>
    </div>
    <new-problem-modal [roomId]="roomId" (onNewProblemCreation)="onNewProblemCreation()"></new-problem-modal>
    <new-feature-modal [roomId]="roomId" (onNewFeatureCreation)="onNewFeatureCreation()"></new-feature-modal>
    <new-event-modal [roomId]="roomId" (onNewActivityCreation)="onNewActivityCreation()"></new-event-modal>
    `
})
export class RoomContentComponent implements OnInit {

    eventChanges: number = 0;
    problemChanges: number = 0;
    featureChanges: number = 0;
    room: Room = {id: 0, name: "", building: "", department: ""};
    roomId: number;

    constructor(private http: HttpService, private route: ActivatedRoute) { }

    onNewActivityCreation() {
        this.eventChanges++;
    }

    onNewProblemCreation() {
        this.problemChanges++;
    }

    onNewFeatureCreation() {
        this.featureChanges++;
    }

    ngOnInit() {
        this.route.params.switchMap((params: Params) => this.roomId = params["id"]).subscribe(v => this.getRoom());
    }

    getRoom() {
        this.http.req({url: "get_room",
                       replaceMap: {id: this.roomId},
                       handler: this.setRoom.bind(this)})
    }

    setRoom(response: Response) {
        this.room = response.json();
    }

}

interface Room {
    id: number,
    name: string,
    building: string,
    department: string
}
