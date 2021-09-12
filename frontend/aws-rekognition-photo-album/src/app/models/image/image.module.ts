import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Label } from '../labels/label.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Image {

  _id?: string;
  Image?: string;
  Labels?: Array<Label>;

}
