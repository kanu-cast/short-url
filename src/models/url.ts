import { Schema, model, Document } from 'mongoose';

export interface IUrl extends Document {
  longUrl: string;
  shortUrl: string;
}

const urlSchema = new Schema<IUrl>({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

const Url = model<IUrl>('Url', urlSchema);

export default Url;
