import { Document, Schema } from "mongoose";
import { UserRole } from "./enums";

export interface IUser extends Document {
  id: number;
  email: string;
  password: string;
  ban: boolean;
  role: number;
  address: string;
  height: number,
  width: number,


  saveData: () => void;
}

export const IUserSchemaDocument = new Schema<IUser>({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  ban: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    unique: true,
    default: 1
  },
  role: {
    type: Number,
    enum: UserRole,
    default: UserRole.user
  },
  address: {
    type: String,
    default: "Садовая улица"
  },
  height: {

  }
},
  { timestamps: true }
)



IUserSchemaDocument.methods.saveData = async function () {

  const UserModel: any = this.constructor;
  const user = await UserModel.findOne().sort({ id: -1 });
  const newCustomId = user ? user.id + 1 : 1;
  this.id = newCustomId;
  await this.save();
};