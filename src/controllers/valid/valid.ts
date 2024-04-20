import { FastifyReply, FastifyRequest } from "fastify"
import { SECRET_KEY_ACCESS } from "../../../config"
import { UserDB } from "../../database"
import { getError } from "../../errors"
import { UserRole } from "../../models/User/enums"
import { ErrorEnum } from "../../models/enums/errors"
import jwt from 'jsonwebtoken'
import { IUser } from "../../models/User"

export const SchemaHeadersAuth = {
    type: "object",
    required: ["token"],
    properties: {
        token: {
            type: "string",
            description:
                "Токен пользователя. Является обязательным параметром. Вставляется в headers",
        },
    },
}
const all: Array<UserRole> = [UserRole.admin, UserRole.user]

export const preHandlerUser = async (req: FastifyRequest, res: FastifyReply) => {
    const tokenJWT = `${req.headers.token || ""}`;
    const result = await valid(tokenJWT, req.routerPath);
    if (!result) {
        return res
            .status(401)
            .send(getError(ErrorEnum.NoAccess));
    }
    console.log("result", result)
    req.headers["user"] = JSON.stringify(result)
};

export const paths: Array<{
    path: string,
    accesses: Array<UserRole>
}> = [
        {
            path: "/login/valid",
            accesses: all
        },
        {
            path: "/user/info/get",
            accesses: all
        },
        {
            path: "/store/create",
            accesses: all
        },
        {
            path: "/store/list",
            accesses: all
        }
    ]

export type PropsGenerateAccessToken = {
    id: number,
    role: string
}
export const valid = async (token: string, path: string): Promise<IUser | null> => {
    try {
        const payload: PropsGenerateAccessToken = jwt.verify(token, SECRET_KEY_ACCESS) as PropsGenerateAccessToken
        console.log("payload", payload)
        const user = await UserDB
            .findOne({ id: payload.id, role: payload.role }, { email: 1, id: 1, role: 1, _id: 0 })
            .lean();
        console.log("user",user)
        if (!user) {
            return null
        }
        const _path = paths.find(e => e.path == path && e.accesses.includes(user.role))
        console.log("path",_path)
        if (!_path) {
            return null
        }
        return user

    } catch {
        return null
    }
}