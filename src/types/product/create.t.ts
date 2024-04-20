import { Type, Static } from "@feathersjs/typebox";

export const productCreateSchema = Type.Object({
    Product_Name: Type.String({
        description: "Наименование продукта"
    }),
    Product_Cost: Type.Number({
        description: "Стоимость продукта"
    }),
    Manufacture_Date: Type.String({
        description: "Дата производства продукта"
    }),
    Expiry_Date: Type.String({
        description: "Дата истечения срока годности продукта"
    }),
    SKU: Type.String({
        description: "Код товара"
    }),
    Store_Name: Type.String({
        description: "Наименование склада"
    }),
    Store_Address: Type.String({
        description: "Адрес склада"
    }),
    Region: Type.String({
        description: "Регион"
    }),
    Sale_Date: Type.String({
        description: "Дата продажи"
    }),
    Quantity_Sold: Type.Number({
        description: "Количество проданных товаров"
    }),
    Product_Amount: Type.Number({
        description: "Сумма продаж"
    }),
    Product_Measure: Type.String({
        description: "Единица измерения продукта"
    }),
    Product_Volume: Type.Number({
        description: "Объем продукта"
    }),
    Manufacturer: Type.String({
        description: "Производитель"
    }),
    Height: Type.Number({
        description: "Долгота продукта"
    }),
    Width: Type.Number({
        description: "Широта продукта"
    })
});

export type IProductCreateSchema = Static<typeof productCreateSchema>