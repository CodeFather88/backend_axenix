import { Document, Schema } from "mongoose";
import { PointTypeEnum } from "./enums";

export interface IPoint extends Document {
    id: number;
    type: PointTypeEnum
    saveData: () => void;
}

export const IPointSchemaDocument = new Schema<IPoint>({
    id: {
      type: Number,
      unique: true,
      default: 1
    },
    type: {
        type: String,
        enum: PointTypeEnum
    }
  },
{timestamps: true}
)
  
  
  
  IPointSchemaDocument.methods.saveData = async function () {
    const PointModel: any = this.constructor;
    const point = await PointModel.findOne().sort({ id: -1 });
    const newCustomId = point ? point.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
  };