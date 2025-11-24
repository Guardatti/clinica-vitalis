import { NextFunction, Request, Response } from "express";
import { ROLES } from "../helpers/constants";


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    const { userConfirmated } = req.body;

    if (!userConfirmated) {
        res.status(404).json({
            msg: 'No hay usuario confirmado'
        });
        return
    }

    if (userConfirmated.rol !== ROLES.admin) {
        return res.status(401).json({
            msg: "El usuario no es un administrador"
        });
    }

    next();
}