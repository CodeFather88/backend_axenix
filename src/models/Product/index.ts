import { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  id: number;
  userId: number,
  height: number,
  width: number,
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
  { timestamps: true }
)


