import { hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY_ACCESS } from '../../../config';
import { UserDB } from '../../database';
import { IUserDocument } from '../../models/User';
import { UserRole } from '../../models/User/enums';

export type PropsGenerateAccessToken = {
    id: number,
    role: UserRole
}

//#region Метод генерации jwt токена
export const generateAccessToken = (payload: PropsGenerateAccessToken): string => {
    return jwt.sign(payload, SECRET_KEY_ACCESS, { expiresIn: "24h" })
}
//#endregion

//#region 
export const findUser = async (email: string) => {
    const user = await UserDB
        .findOne({ email }, {_id: 0})
        .lean()
            return user
}

export const hashPassword = async (password: string) => {
    return await hash(password, 12);
}

export const createUser = async ({email, hashedPassword}: {email: string, hashedPassword: string}): Promise<IUserDocument> => {
    const user = new UserDB({
        email,
        password: hashedPassword
    })
    await user.saveData()
    return user
}