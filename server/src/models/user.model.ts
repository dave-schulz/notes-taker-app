import { Schema, InferSchemaType, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, select: false, unique: true },
  password: { type: String, required: true, select: false },
});

type User = InferSchemaType<typeof UserSchema>;

export default model<User>('User', UserSchema);
