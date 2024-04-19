import type { Static } from '@feathersjs/typebox'
import { Type } from '@feathersjs/typebox';


export const loginSchema = Type.Object({
    email: Type.String(
        {
            description: 'Почта пользователя',
            minLength: 3,
            maxLength: 32
        }
    ),
    password: Type.String({
        description: 'Пароль пользователя',
        minLength: 1,
        maxLength: 32
    })

},

)

export type ILoginSchema = Static<typeof loginSchema>
