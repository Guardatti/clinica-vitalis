import { Request, Response } from "express";
import { Op } from "sequelize";
import { Speciality } from "../models/speciality";



export const createSpeciality = async (req: Request, res: Response) => {

    const data = req.body;

    try {

        const speciality = await Speciality.create(data)

        res.status(201).json({
            speciality
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}

export const getSpecialities = async (req: Request, res: Response) => {

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

        const specialities = await Speciality.findAll({
            where: filter
        })

        if (!specialities) {
            res.status(404).json({
                msg: "No hay especialidades cargados en el sistema"
            })
            return
        }

        res.status(200).json({
            specialities
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}

export const getSpecialityById = async (req: Request, res: Response) => {

    try {
        
        const { id } = req.params;

        const speciality = await Speciality.findByPk(id)

        if (!speciality) {

            res.status(404).json({
                msg: "No hay especialidad cargada en el sistema"
            })

            return
        }

        res.status(200).json({
            speciality
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}

export const updateSpeciality = async (req: Request, res: Response) => {

    const data = req.body;

    const id = req.params.id;

    try {
        
        if (!id || isNaN(Number(id))) {
            res.status(400).json({
                msg: "Debe enviar un ID y debe ser numérico"
            })
            return
        }

        const speciality = await Speciality.findByPk(id)

        if (!speciality) {
            res.status(404).json({
                msg: "La especialidad no está cargado en el sistema"
            })
            return
        }

        await speciality.update(data)

        res.status(200).json({
            speciality
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })       
    }

}