import { Document, Schema, Types } from "mongoose";
import { ICar } from "../Car";

export interface ICarrier extends Document {
    id: number;
    width: number
    height: number,
    carsInUse: Types.ObjectId[]
    saveData: () => void;
}

export const ICarrierSchemaDocument = new Schema<ICarrier>({
    id: {
        type: Number,
        unique: true,
        default: 1
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    carsInUse: [{
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }]
},
    { timestamps: true }
)


ICarrierSchemaDocument.methods.saveData = async function () {

    const CarrierModel: any = this.constructor;
    const carrier = await CarrierModel.findOne().sort({ id: -1 });
    const newCustomId = carrier ? carrier.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
};