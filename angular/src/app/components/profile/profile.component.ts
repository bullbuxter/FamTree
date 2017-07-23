import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  families: any
  constructor(private appService:AppService) { }

  ngOnInit() {
    this.appService.getFamilies().subscribe(data => {
      this.families = data;
    });
  }

}
