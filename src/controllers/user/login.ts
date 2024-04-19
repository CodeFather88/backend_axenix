import { compareSync, hashSync } from 'bcrypt';
import { createUser, findUser, generateAccessToken, hashPassword } from '../../services/user';
import { getError } from '../../errors';
import { UserDB } from '../../database';
import { ILoginSchema } from '../../types/user/login.t';
import { ErrorEnum } from '../../models/enums/errors';

export const authUser = async (body: ILoginSchema) => {
    const { email, password } = body
    const user = await findUser(email)
    if (!user) {
        return getError(ErrorEnum.InvalidLoginOrPassword)
    }
    const validPassword = compareSync(password, user.password)
    if (!validPassword) {
        return getError(ErrorEnum.InvalidLoginOrPassword)
    }
    const token = generateAccessToken({
        id: user.id,
        role: user.role
    })
    return { token }
}

export async function register(body: ILoginSchema) {
    try {
        const { email, password } = body;
        const existingUser = await findUser(email);
        if (existingUser) {
            return getError(ErrorEnum.UserExists)
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await createUser({email, hashedPassword})
        const token = generateAccessToken({ id: newUser.id, role: newUser.role });
        return {
            token,
        };
    } catch (err) {
        return err;
    }
}
