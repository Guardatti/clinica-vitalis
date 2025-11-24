import { Request, Response } from "express";
import { IUser, User } from "../models/user";
import bycryptjs from "bcryptjs"
import { ROLES } from "../helpers/constants";
import { generateJWT } from "../helpers/generateJWT";


export const register = async (req: Request, res: Response): Promise<void> => {

    const {name, surname, email, password, rol}: IUser = req.body;

    try {

        const user = await User.create({name, surname, email, password, rol})

        const salt = bycryptjs.genSaltSync();

        user.password = bycryptjs.hashSync(password, salt)
        
        const adminKey = req.headers["admin-key"]

        if (adminKey === process.env.KEY_FOR_ADMIN) {
            user.rol = ROLES.admin
        }

        await user.save()

        res.status(201).json({
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }

}

export const login = async (req: Request, res: Response): Promise<void> => {

    const {email, password}: IUser = req.body

    try {
        
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            res.status(400).json({
                msg: "No se encontró el email"
            })
            return
        }

        const validatePassword = bycryptjs.compareSync(password, user.password)

        if (!validatePassword) {
            res.status(401).json({
                msg: "La contraseña es incorrecta"
            })
            return
        }

        const token = await generateJWT(user.id.toString())

        res.status(200).json({
            name: user.name,
            surname: user.surname,
            email: user.email,
            rol: user.rol,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }

}