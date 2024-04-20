import type { Static } from '@feathersjs/typebox'
import { Type } from '@feathersjs/typebox';


export const storeCoordschema = Type.Object({
    page: Type.Number(
        {
            description: 'страница'
        }
    )
},

)

export type IStoreCoordSchema = Static<typeof storeCoordschema>
