import { StoreDB } from "../../database";
import { IStoreCreateSchema } from "../../types/store/create.t";

export const createNewStore = async ({ user, body }: { user: any, body: IStoreCreateSchema }) => {
    const {width, height, square, address} = body
    const newUser = new StoreDB({
        userId: user.id,
        square,
        width,
        height,
        address
    })
    newUser.saveData()
    return {state:true}
}