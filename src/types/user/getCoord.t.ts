import type { Static } from '@feathersjs/typebox'
import { Type } from '@feathersjs/typebox';


export const userCoordschema = Type.Object({
    page: Type.Number(
        {
            description: 'страница'
        }
    )
},

)

export type IUserCoordSchema = Static<typeof userCoordschema>
