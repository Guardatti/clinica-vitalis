import { Request, Response } from "express";
import { Op } from "sequelize";
import { SocialsWorks } from "../models/socialsWorks";



export const createSocialWork = async (req: Request, res: Response) => {

    const data = req.body;

    try {

        const socialWork = await SocialsWorks.create(data)

        res.status(201).json({
            socialWork
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}

export const getSocialsWorks = async (req: Request, res: Response) => {

    try {
        
        const {search, state} = req.query;

        const filter: any = {}

        if (search) {
            filter[Op.or] = [
                {
                    name: {[Op.like]: `%${search}`}
                }
            ]
        }
        
        if (state) {
            filter.state = state
        }

        const socialsWorks = await SocialsWorks.findAll({
            where: filter
        })

        if (!socialsWorks) {
            res.status(404).json({
                msg: "No hay obras sociales cargadas en el sistema"
            })
            return
        }

        res.status(200).json({
            socialsWorks
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}

export const updateSocialWork = async (req: Request, res: Response) => {

    const data = req.body;

    const id = req.params.id;

    try {
        
        if (!id || isNaN(Number(id))) {
            res.status(400).json({
                msg: "Debe enviar un ID y debe ser numérico"
            })
            return
        }

        const socialWork = await SocialsWorks.findByPk(id)

        if (!socialWork) {
            res.status(404).json({
                msg: "La obra social no está cargado en el sistema"
            })
            return
        }

        await socialWork.update(data)

        res.status(200).json({
            socialWork
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })       
    }

}