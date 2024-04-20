import { Document, Schema } from "mongoose";

export interface IDistanceMatrix extends Document {
    id: number;
    firstPoint: number
    secondPoint: number
    saveData: () => void;
}

export const IDistanceMatrixSchemaDocument = new Schema<IDistanceMatrix>({
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
  },
{timestamps: true}
)
  
  
  
  IDistanceMatrixSchemaDocument.methods.saveData = async function () {
  
    const DistanceMatrixModel: any = this.constructor;
    const distanceMatrix = await DistanceMatrixModel.findOne().sort({ id: -1 });
    const newCustomId = distanceMatrix ? distanceMatrix.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
  };