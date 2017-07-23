import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FamilyComponent } from './components/family/family.component';

import {AppService} from "./services/app.service";


const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "tree", component: TreeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "family/:id", component: FamilyComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    FamilyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
