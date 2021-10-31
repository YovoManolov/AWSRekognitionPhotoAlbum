import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Label } from '../labels/label.module';
import ObjectID from 'bson-objectid';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class Image {
  _id?: ObjectID;
  Image?: string;
  Labels?: Array<Label>;
  User?: string;
}