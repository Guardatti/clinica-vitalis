import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser, User } from "../models/user";
import { error } from "console";


export const validatorJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers["x-token"] as string

    if (!token) {
        res.status(401).json({
            msg: 'No hay token en la petición'
        })
        return
    }

    try {
        
        const secret_key = process.env.KEY_SECRET as string;

        const payload = jwt.verify(token, secret_key) as JwtPayload;

        const { id } = payload;

        const userConfirmated: IUser | null = await User.findByPk(id)

        if (!userConfirmated) {

            res.status(404).json({
                msg: 'El usuario no se encuentra en la DB'
            })
            
            throw new Error("Usuario no encontrado");
        }

        req.body={...req.body,userConfirmated}
        
        next();

    } catch (error) {  

        console.log(error);
    
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}   