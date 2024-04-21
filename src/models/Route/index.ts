import { Document, Schema, Types } from "mongoose";

export interface IRoute extends Document {
    distance: number,
    duration: number,
    sourceId: number,
    source_name: string,
    target_id: number,
    target_name: string,
    saveData: () => void;
}

export const IRouteSchemaDocument = new Schema<IRoute>({
    id: {
        type: Number,
        unique: true,
        default: 1
    },
    distance: {
        type: Number
    },
    duration: {
        type: Number
    },
    sourceId: {
        type: Number
    },
    source_name: {
        type: String
    },
    target_id: {
        type: Number
    },
    target_name: {
        type: String
    }
},
    { timestamps: true }
)


IRouteSchemaDocument.methods.saveData = async function () {

    const RouteModel: any = this.constructor;
    const route = await RouteModel.findOne().sort({ id: -1 });
    const newCustomId = route ? route.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
};