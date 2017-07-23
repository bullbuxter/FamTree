import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  id = "";
  members: any[];
  // searchTypes = {search:}
  fName: String;
  lName: String;
  photo: File;
  gender = "1";
  father: String;
  spouse: String;
  children: String[];
  dob: Date;

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.appService.getFamilyMembers(this.id).subscribe(data => {
      this.members = data;
    });
  }

  onSearchChange(value: String) {
    this.appService.getFamilyMembers(this.id).subscribe(data => {
      this.members = data;
      this.members = this.members.filter(function(member) {
        return member.name.fName.toLowerCase().startsWith(value.toLowerCase());
      });
    });
  }
  onFatherChange(value: String) {

  }
  onSpouseChange(value: String) {

  }
  onChildChange(value: String) {

  }
  onSubmitNewMember() {
    const member = {
      family: this.id,
      name: {
        fName: this.fName,
        lName: this.lName,
      },
      gender: this.gender,
      father: this.father,
      spouse: this.spouse,
      children: this.children,
      dob: this.dob
    };
    this.appService.postNewMember(member).subscribe(data => {
      if(data.success) {
        this.appService.uploadPhoto(this.photo, data.member_id).subscribe(data => {
          if(data.success) {
            console.log(data.msg);
            this.appService.getFamilyMembers(this.id).subscribe(data => {
              document.getElementById("modal_close").click();
              this.members = data;
            });
          }
        });
      }
    });

  }
  browse() {
    document.getElementById("member_photo").click();
  }
  uploadPhoto(ele) {
    if (ele.files && ele.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("photo")["src"] = e["target"]["result"];
        };
        reader.readAsDataURL(ele.files[0]);
        this.photo = ele.files[0];
    }
  }
}
