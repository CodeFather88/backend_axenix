import { UserDB } from "../../database";
import { PointTypeEnum } from "../store/PointTypeEnum";
export const userCoord = async () => {
    const usersCoord = await UserDB.find({}, { width: 1, height: 1, id: 1, _id: 0 }).lean();
    return {
        list: usersCoord.map(coord => ({ ...coord, type: PointTypeEnum.Store }))
    };
}