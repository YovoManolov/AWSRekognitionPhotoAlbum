import ObjectID from 'bson-objectid';
import { Label } from './label_model';

export class Image {
  _id?: ObjectID;
  Image?: string;
  Labels?: Array<Label>;
  User?: string;
}