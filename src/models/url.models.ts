import { Schema, model, Document } from 'mongoose';

interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  clickCount: number;
}

const urlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  clickCount: { type: Number, default: 0 },
});

const Url = model<IUrl>('Url', urlSchema);

export {
  Url,
  IUrl
};
