import { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    id: number;
    userId: number,
    height: string, 
    width: string,
    Product_Name: string,
    Product_Cost: number,
    Manufacture_Date: Date,
    Expiry_Date: Date,
    SKU: string,
    Store_Name: string,
    Store_Address: string,
    Region: string,
    Sale_Date: Date,
    Quantity_Sold: number,
    Product_Amount: number,
    Product_Measure: string,
    Product_Volume: number,
    Manufacturer: string,
    Height: number,
    Width: number

    saveData: () => void;
}

export const IProductSchemaDocument = new Schema<IProduct>({
    id: {
      type: Number,
      unique: true,
      default: 1
    }
  },
{timestamps: true}
)
  
  
  
  IProductSchemaDocument.methods.saveData = async function () {
    const ProductModel: any = this.constructor;
    const Product = await ProductModel.findOne().sort({ id: -1 });
    const newCustomId = Product ? Product.id + 1 : 1;
    this.id = newCustomId;
    await this.save();
  };