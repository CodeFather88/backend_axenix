import { Document, Schema } from "mongoose";

export interface IPointRout extends Document {
    id: number;
    saveData: () => void;
}

export interface IPointRoutDocument extends IPointRout, Document { 
  id: number
}

export const IUserSchemaDocument = new Schema<IPointRout>({
    id: {
      type: Number,
      unique: true,
      default: 1
    },
  },
{timestamps: true}
)
  
  
  
  IUserSchemaDocument.methods.saveData = async function () {
  
    const PointRoutModel: any = this.constructor;
    const pointRout = await PointRoutModel.findOne().sort({ id: -1 });
    const newCustomId = pointRout ? pointRout.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
  };