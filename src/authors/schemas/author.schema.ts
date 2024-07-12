import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  birthdate: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
