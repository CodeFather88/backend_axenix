import { Document, Schema } from "mongoose";

export interface ICar extends Document {
    id: number;
    userId: number;
    firstPoint: number
    secondPoint: number
    volume: number
    width: number
    height: number
    saveData: () => void;
}

export const ICarSchemaDocument = new Schema<ICar>({
    id: {
      type: Number,
      unique: true,
      default: 1
    },
    firstPoint: {
        type: Number,
    },
    secondPoint: {
        type: Number,
    },
    userId: {
        type: Number
    },
    volume: {
        type: Number
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    }
  },
{timestamps: true}
)
  
  
  ICarSchemaDocument.methods.saveData = async function () {
  
    const DistanceMatrixModel: any = this.constructor;
    const distanceMatrix = await DistanceMatrixModel.findOne().sort({ id: -1 });
    const newCustomId = distanceMatrix ? distanceMatrix.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
  };