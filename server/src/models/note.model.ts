import { InferSchemaType, model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>('Note', noteSchema);
