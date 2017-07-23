import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AppService {
  base_url = "http://localhost:3000/";
  headers: any;
  multer: any;
  constructor(private http:Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.multer = new Headers();
  }

  getFamilies() {
    return this.http.get(this.base_url + "families", {headers: this.headers}
    ).map(res => res.json());
  }
  getFamilyMembers(family_id) {
    return this.http.get(this.base_url + "family/" + family_id + "/members",
      {headers: this.headers},
    ).map(res => res.json());
  }
  postNewMember(member) {
    return this.http.post(this.base_url + "family/member/new", member,
      {headers: this.headers}
    ).map(res => res.json());
  }
  uploadPhoto(photo, member_id) {
    var formData: any = new FormData();
    formData.append("photo", photo);
    formData.append("member_id", member_id);
    return this.http.post(this.base_url + "family/member/photo", formData,
      {headers: this.multer}
    ).map(res => res.json());
  }
}
