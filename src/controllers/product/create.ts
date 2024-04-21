import { ProductDB } from "../../database";
import { IProductCreateSchema } from '../../types/product/create.t'
export const createNewProduct = async ({ user, body }: { user: any, body: IProductCreateSchema }) => {
    try {
        const {
            Product_Name,
            Product_Cost,
            Manufacture_Date,
            Expiry_Date,
            SKU,
            Store_Name,
            Store_Address,
            Region,
            Sale_Date,
            Quantity_Sold,
            Product_Amount,
            Product_Measure,
            Product_Volume,
            Manufacturer,
            Height,
            Width } = body;

        const newProduct = new ProductDB({
            Product_Name,
            Product_Cost,
            Manufacture_Date,
            Expiry_Date,
            SKU,
            Store_Name,
            Store_Address,
            Region,
            Sale_Date,
            Quantity_Sold,
            Product_Amount,
            Product_Measure,
            Product_Volume,
            Manufacturer,
            Height,
            Width
        });
        await newProduct.save();

        return { state: true };
    } catch (error) {
        console.error("Error creating new product:", error);
        return { state: false, error: "Failed to create new product" };
    }
}
