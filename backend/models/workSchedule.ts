import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { Professionals } from "./professionals";


export interface IWorkSchedule {
    id: number;
    professionalID: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
}

interface IWorkScheduleAttributes extends Optional<IWorkSchedule, 'id'> {}

interface WorkScheduleInstance extends Model<IWorkSchedule, IWorkScheduleAttributes>, IWorkSchedule {}


export const WorkSchedule = sequelize.define<WorkScheduleInstance>('Horarios_Trabajo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    professionalID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Professionals,
            key: 'id'
        }
    },
    dayOfWeek: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: {
            min: 0,
            max: 6
        }
    },
    startTime: {
        type: DataTypes.TIME, 
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME, 
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['professionalID', 'dayOfWeek'],
            name: 'unique_schedule_day_per_pro' 
        }
    ]
});