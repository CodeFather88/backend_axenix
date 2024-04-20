import type { Static } from '@feathersjs/typebox'
import { Type } from '@feathersjs/typebox';


export const storeCreateSchema = Type.Object({
    width: Type.Number(
        {
            description: 'широта'
        }
    ),
    height: Type.Number({
        description: 'высота'
    }),
    square: Type.Number({
        description: "Площадь склада"
    }),
    address: Type.String({
        description: "адрес склада"
    }),
    volume: Type.Number({
        description: "Объем склада"
    })



},

)

export type IStoreCreateSchema = Static<typeof storeCreateSchema>
