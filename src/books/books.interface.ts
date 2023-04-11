import { Document } from 'mongoose';

export interface Item extends Document {
  id?: number;
  title: string;
  description?: string;
  author: string;
}