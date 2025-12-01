import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { Patients } from "./patients";
import { Professionals } from "./professionals";
import { STATES_SHIFTS } from "../helpers/constants";

export interface IShifts {
    id: number;
    patientID: number;
    professionalID: number;
    date: Date;
    description: string;
    state?: string;
}

interface IShiftsAttributes extends Optional<IShifts, 'id'> {}

interface ShiftInstance extends Model<IShifts, IShiftsAttributes>, IShifts {}

export const Shifts = sequelize.define<ShiftInstance>('Turnos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
        patientID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patients,
            key: 'id'
        }
    },
        professionalID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Professionals,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        defaultValue: STATES_SHIFTS.pending,
        allowNull: false,
    }
})