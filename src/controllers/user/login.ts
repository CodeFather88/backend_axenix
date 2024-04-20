import { compareSync, hash, hashSync } from 'bcrypt';
import { getError } from '../../errors';
import { ILoginSchema } from '../../types/user/login.t';
import { ErrorEnum } from '../../models/enums/errors';
import jwt from 'jsonwebtoken'
import { SECRET_KEY_ACCESS } from '../../../config';
import { UserDB } from '../../database';

export const authUser = async (body: ILoginSchema) => {
    const { email, password } = body
    const user = await UserDB
        .findOne({ email }, {_id: 0})
        .lean()
    if (!user) {
        return getError(ErrorEnum.InvalidLoginOrPassword)
    }
    const validPassword = compareSync(password, user.password)
    if (!validPassword) {
        return getError(ErrorEnum.InvalidLoginOrPassword)
    }
    const token = jwt.sign({id: user.id, role: user.role}, SECRET_KEY_ACCESS, { expiresIn: "24h" })
    return { token }
}

export async function register(body: ILoginSchema) {
    try {
        const { email, password } = body;
        const existingUser = await UserDB
        .findOne({ email }, {_id: 0})
        .lean()
        if (existingUser) {
            return getError(ErrorEnum.UserExists)
        }
        const hashedPassword = await hash(password, 12);
        const newUser = new UserDB({
            email,
            password: hashedPassword
        })
        await newUser.saveData()
        const token = jwt.sign({id: newUser.id, role: newUser.role}, SECRET_KEY_ACCESS, { expiresIn: "24h" })
        return {
            token,
        };
    } catch (err) {
        return err;
    }
}
