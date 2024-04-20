import { Document, Schema } from "mongoose";

export interface IMetric extends Document {
    id: number;
    firstPoint: number
    secondPoint: number
    distance: number
    duration: number
    saveData: () => void;
}

export const IMetricSchemaDocument = new Schema<IMetric>({
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
    distance: {
      type: Number
    },
    duration: {
      type: Number
    }
  },
{timestamps: true}
)
  
  
  IMetricSchemaDocument.methods.saveData = async function () {
  
    const DistanceMatrixModel: any = this.constructor;
    const distanceMatrix = await DistanceMatrixModel.findOne().sort({ id: -1 });
    const newCustomId = distanceMatrix ? distanceMatrix.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
  };