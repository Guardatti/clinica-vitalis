import { Request, Response } from "express";
import { Professionals } from "../models/professionals";
import { Op } from "sequelize";
import { Speciality } from "../models/speciality";
import { WorkSchedule } from "../models/workSchedule";
import { STATES_PROFESSIONALS } from "../helpers/constants";



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
        
        const {search, gender, specialityID, state} = req.query;

        const filter: any = {}

        if (search) {
            filter[Op.or] = [
                {
                    name: {[Op.like]: `%${search}`}
                },
                {
                    surname: {[Op.like]: `%${search}`}
                },
                {
                    dni: {[Op.like]: `%${search}`}
                }
            ]
        }
        
        if (gender) {
            filter.gender = gender
        }

        if (specialityID) {
            filter.specialityID = specialityID
        }

        if (state) {
            filter.state = state
        }

        const professionals = await Professionals.findAll({
            where: filter,
            include: [
                {
                    model: Speciality,
                    attributes: ['name']
                },
                {
                    model: WorkSchedule,
                    attributes: ['dayOfWeek', 'startTime', 'endTime']
                }
            ]
        })

        const countActives = await Professionals.count({
            where: {
                    state: STATES_PROFESSIONALS.active
                },
        })

        if (!professionals) {
            res.status(404).json({
                msg: "No hay profesionales cargados en el sistema"
            })
            return
        }

        res.status(200).json({
            professionals,
            countActives
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}

export const getProfessionalById = async (req: Request, res: Response) => {

    try {
        
        const { id } = req.params;

        const professional = await Professionals.findByPk(id)

        if (!professional) {

            res.status(404).json({
                msg: "No hay profesional cargado en el sistema"
            })

            return
        }

        res.status(200).json({
            professional
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