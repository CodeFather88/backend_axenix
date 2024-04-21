import { Document, Schema } from "mongoose";
import { IProduct } from "../Product";

export enum OrderStatusEnum {
    Processing = "в обработке",
    InTransit = "в пути",
    Delivered = "доставлен"
}

export interface IOrder extends Document {
    id: number;
    userId: number;
    firstPoint: { width: number; height: number };
    secondPoint: { width: number; height: number };
    orderCost: number;
    SKU: number;
    carId: number;
    status: OrderStatusEnum;
    createdAt: Date;
    updatedAt: Date;
    products: Array<IProduct>;
    deliveryInfo: {
        address: string;
        contact: string;
    };
    paymentMethod: "наличные" | "кредитная карта" | "электронные платежи";
    saveData: () => void;
}

export const IOrderSchemaDocument = new Schema<IOrder>({
    id: {
        type: Number,
        unique: true,
        default: 1
    },
    firstPoint: {
        type: {
            width: {
                type: Number
            },
            height: {
                type: Number
            }
        }
    },
    secondPoint: {
        type: {
            width: {
                type: Number
            },
            height: {
                type: Number
            }
        }
    },
    userId: {
        type: Number
    },
    orderCost: {
        type: Number
    },
    SKU: {
        type: Number
    },
    carId: {
        type: Number
    },
    status: {
        type: String,
        enum: OrderStatusEnum,
        default: OrderStatusEnum.Processing
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product' // Если у вас есть модель Product, вы можете ссылаться на нее здесь
    }],
    deliveryInfo: {
        address: {
            type: String
        },
        contact: {
            type: String
        },
        // Другие поля информации о доставке, если необходимо
    },
    paymentMethod: {
        type: String,
        enum: ["наличные", "кредитная карта", "электронные платежи"],
        default: "наличные"
    }
});



IOrderSchemaDocument.methods.saveData = async function () {

    const DistanceMatrixModel: any = this.constructor;
    const distanceMatrix = await DistanceMatrixModel.findOne().sort({ id: -1 });
    const newCustomId = distanceMatrix ? distanceMatrix.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
};