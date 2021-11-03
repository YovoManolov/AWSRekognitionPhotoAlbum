import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ObjectID from 'bson-objectid';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class User {
  _id?: ObjectID;
  Email?: string;
  Type?: string;
}


