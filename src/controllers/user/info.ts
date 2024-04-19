import { UserDB } from "../../database"

export const getUserInfo = async (user: any) => {
    return await UserDB.findOne({id: user.id}, {_id: 0, password: 0}).lean()
}