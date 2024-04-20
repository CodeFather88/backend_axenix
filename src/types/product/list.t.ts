import type { Static } from '@feathersjs/typebox'
import { Type } from '@feathersjs/typebox';


export const productListSchema = Type.Object({
    page: Type.Number(
        {
            description: 'страница'
        }
    ),
    search: Type.Optional(Type.String({
        description: "текст поиска"
    }))

},

)

export type IProductListSchema = Static<typeof productListSchema>
