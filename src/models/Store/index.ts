import { Document, Schema } from "mongoose";

export interface IStore extends Document {
    id: number;
    address: string;
    height: number, 
    width: number,
    square: number, 
    name: string,
    userId: number
    saveData: () => void;
}

export const IStoreSchemaDocument = new Schema<IStore>({
    id: {
      type: Number,
      unique: true,
      default: 1
    },
    userId: {
      type: Number
    },
    square: {
        type: Number,
        default: 800
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    address: {
      type: String
    },
    name: {
      type: String
    },
  },
{timestamps: true}
)
  
IStoreSchemaDocument.index({name: 'text', address: 'text'});
  
  IStoreSchemaDocument.methods.saveData = async function () {
    const StoreModel: any = this.constructor;
    const store = await StoreModel.findOne().sort({ id: -1 });
    const newCustomId = store ? store.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
  };

