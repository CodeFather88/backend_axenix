import {ErrorEnum} from '../models/enums/errors'
const errors: Array<{
    message: string,
    code: ErrorEnum
}> = [
        {
            code: ErrorEnum.InvalidLoginOrPassword,
            message: "Неверный логин или пароль"
        },
        {
            code: ErrorEnum.NoAccess,
            message: "Нет доступа",
        },
        {
            code: ErrorEnum.UserExists,
            message: "Такой пользователь уже существует"
        },
        {
            code: ErrorEnum.NotFoundUser,
            message: "Пользователь не найден"
        }
    ]

export const getError = (code: ErrorEnum) => {
    const error = errors.find(e => e.code == code)
    return {
        error
    }
}