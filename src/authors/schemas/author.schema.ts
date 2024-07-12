import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  bio: string;

  @Prop()
  birthdate: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
