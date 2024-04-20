import { Document, Schema } from "mongoose";

export interface ITimeMatrix extends Document {
    id: number;
    firstPoint: number
    secondPoint: number
    saveData: () => void;
}

export const ITimeMatrixSchemaDocument = new Schema<ITimeMatrix>({
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
  
  
  
  ITimeMatrixSchemaDocument.methods.saveData = async function () {
  
    const TimeMatrixModel: any = this.constructor;
    const timeMatrix = await TimeMatrixModel.findOne().sort({ id: -1 });
    const newCustomId = timeMatrix ? timeMatrix.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
  };