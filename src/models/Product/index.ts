import { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  id: number;
  userId: number;
  Product_Name: string;
  Product_Cost: number;
  Manufacture_Date: Date;
  Expiry_Date: Date;
  SKU: string;
  Store_Name: string;
  Store_Address: string;
  Region: string;
  Sale_Date: Date;
  Quantity_Sold: number;
  Product_Amount: number;
  Product_Measure: string;
  Product_Volume: number;
  Manufacturer: string;
  height: number;
  width: number;
  
  saveData: () => void;
}

export const IProductSchemaDocument = new Schema<IProduct>({
  id: {
    type: Number,
    unique: true,
    default: 1
  },
  userId: {
    type: Number,
  },
  Product_Name: {
    type: String,
  },
  Product_Cost: {
    type: Number,
  },
  Manufacture_Date: {
    type: Date,
  },
  Expiry_Date: {
    type: Date,
  },
  SKU: {
    type: String,
  },
  Store_Name: {
    type: String,
  },
  Store_Address: {
    type: String,
  },
  Region: {
    type: String,
  },
  Sale_Date: {
    type: Date,
  },
  Quantity_Sold: {
    type: Number,
  },
  Product_Amount: {
    type: Number,
  },
  Product_Measure: {
    type: String,
  },
  Product_Volume: {
    type: Number,
  },
  Manufacturer: {
    type: String,
  },
  height: {
    type: Number,
  },
  width: {
    type: Number,
  }
},
{ timestamps: true }
);
