import { Request, Response } from "express";
import { Professionals } from "../models/professionals";
import { Op } from "sequelize";



export const createProfessional = async (req: Request, res: Response) => {

    const data = req.body;

    try {

        const professional = await Professionals.create(data)

        res.status(201).json({
            professional
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}

export const getProfessionals = async (req: Request, res: Response) => {

    try {
        
        const {search, speciality, gender} = req.query;

        const filter: any = {}

        if (search) {
            filter[Op.or] = [
                {
                    name: {[Op.like]: `%${search}`},
                    surname: {[Op.like]: `%${search}`}
                }
            ]
        }
        
        if (speciality) {
            filter.speciality = speciality
        }

        if (gender) {
            filter.gender = gender
        }

        const professionals = await Professionals.findAll({
            where: filter
        })

        if (!professionals) {
            res.status(404).json({
                msg: "No hay profesionales cargados en el sistema"
            })
            return
        }

        res.status(200).json({
            professionals
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}

export const updateProfessional = async (req: Request, res: Response) => {

    const data = req.body;

    const id = req.params.id;

    try {
        
        if (!id || isNaN(Number(id))) {
            res.status(400).json({
                msg: "Debe enviar un ID y debe ser numérico"
            })
            return
        }

        const professional = await Professionals.findByPk(id)

        if (!professional) {
            res.status(404).json({
                msg: "El profesional no está cargado en el sistema"
            })
            return
        }

        await professional.update(data)

        res.status(200).json({
            professional
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })       
    }

}