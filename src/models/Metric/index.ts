import { Document, Schema } from "mongoose";

export interface IMetric extends Document {
  id: number;
  firstPoint: {pointId: Number, width: Number, height: Number }
  secondPoint: { pointId: Number, width: Number, height: Number }
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
    type: {
      pointId: {
        type: Number
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      }
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
  }
}, { timestamps: true });


IMetricSchemaDocument.methods.saveData = async function () {

  const MetricModel: any = this.constructor;
  const metric = await MetricModel.findOne().sort({ id: -1 });
  const newCustomId = metric ? metric.id + 1 : 1;
  this.id = newCustomId;
  await this.save();
};