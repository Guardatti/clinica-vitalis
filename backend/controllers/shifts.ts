import { Request, Response } from "express";
import { Shifts } from "../models/shifts";



export const createShift = async (req: Request, res: Response) => {

    const data = req.body;

    try {
        
        const shift = await Shifts.create(data)

        res.status(201).json({
            shift
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}

export const getShifts = async (req: Request, res: Response) => {

    try {
        
        const {state, professionalID, patientID} = req.query
        
        const filter: any = {}

        if (state) {
            filter.state = state
        }

        if (professionalID) {
            filter.professionalID = professionalID
        }

        if (patientID) {
            filter.patientID = patientID
        }

        const shifts = await Shifts.findAll({
            where: filter
        }
        )

        if (!shifts) {
            res.status(404).json({
                msg: "No hay turnos cargados en el sistema"
            })
            return
        }

        res.status(200).json({
            shifts
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })       
    }

}

export const updateShift = async (req: Request, res: Response) => {

    const data = req.body;

    const id = req.params.id

    try {
        
        if (!id || isNaN(Number(id))) {
            res.status(400).json({
                msg: "Debe enviar un ID y debe ser numérico"
            })
            return
        }

        const shift = await Shifts.findByPk(id)

        if (!shift) {
            res.status(404).json({
                msg: "El turno no está cargando en el sistema"
            })
            return
        }

        await shift.update(data);

        res.status(200).json({
            shift
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })       
    }

}