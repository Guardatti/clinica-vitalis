import { Request, Response } from "express";
import { WorkSchedule } from "../models/workSchedule";
import { Professionals } from "../models/professionals";



export const createWorkSchedule = async (req: Request, res: Response) => {
    
    const data = req.body;

    try {
        const schedule = await WorkSchedule.create(data);

        res.status(201).json({
            schedule
        });

    } catch (error: any) {

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                msg: "El profesional ya tiene horarios configurados para este día."
            });
        }
        
        console.log(error);

        res.status(500).json({
            msg: "Error del servidor"
        });
    }
}

export const getWorkSchedules = async (req: Request, res: Response) => {

    try {

        const { professionalID, dayOfWeek } = req.query;
        
        const filter: any = {};

        if (professionalID) {
            filter.professionalID = professionalID
        };

        if (dayOfWeek) {
            filter.dayOfWeek = dayOfWeek;
        }

        const schedules = await WorkSchedule.findAll({
            where: filter,
            include: [
                {
                    model: Professionals,
                    attributes: ['name', 'surname', 'dni'],
                }
            ],
            order: [
                ['dayOfWeek', 'ASC'], 
                ['startTime', 'ASC']
            ],
        });

        if (schedules.length === 0) {

            res.status(404).json({
                msg: "No se encontraron horarios con los filtros proporcionados"
            });
            return;

        }

        res.status(200).json({
            schedules
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error del servidor"
        });
    }
}

export const getWorkScheduleById = async (req: Request, res: Response) => {

    try {
        
        const { id } = req.params;

        const workSchedule = await WorkSchedule.findByPk(id)

        if (!workSchedule) {

            res.status(404).json({
                msg: "El horario no está cargando en el sistema"
            })

            return
        }

        res.status(200).json({
            workSchedule
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}

export const updateWorkSchedule = async (req: Request, res: Response) => {

    const { id } = req.params;
    
    const data = req.body;

    try {

        const schedule = await WorkSchedule.findByPk(id);

        if (!schedule) {
            res.status(404).json({
                msg: "El horario no existe en el sistema"
            });
            return;
        }

        await schedule.update(data);

        res.status(200).json({
            schedule
        });

    } catch (error: any) {

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                msg: "Ya existe otro bloque horario para ese día."
            });
        }

        console.log(error);
        res.status(500).json({
            msg: "Error del servidor"
        });
    }
    
}