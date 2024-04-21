import { Document, Schema } from "mongoose";

export interface ICarrier extends Document {
    id: number;
    width: number
    height: number
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
    }
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