import type { Static } from '@feathersjs/typebox'
import { Type } from '@feathersjs/typebox';


export const storeListSchema = Type.Object({
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

export type IStoreListSchema = Static<typeof storeListSchema>
