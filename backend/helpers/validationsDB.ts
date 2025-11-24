import { IUser, User } from "../models/user"



export const existEmail = async (email: string): Promise<void> => {

    const isExisting: IUser | null = await User.findOne({
        where: {
            email: email
        }
    })

    if (isExisting) {

        throw new Error(`El email ${email} ya está registrado`)

    }

}