import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { Patients } from "./patients";
import { Professionals } from "./professionals";
import { STATES } from "../helpers/constants";

interface IShifts {
    id: number;
    date: Date;
    state: string;
    description: string;
    professionalID: number;
    patientID: number;
}

interface IShiftsAttributes extends Optional<IShifts, 'id'> {}

interface ShiftInstance extends Model<IShifts, IShiftsAttributes>, IShifts {}

export const Shifts = sequelize.define<ShiftInstance>('Turnos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        defaultValue: STATES.pending,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    professionalID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Professionals,
            key: 'id'
        }
    },
    patientID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patients,
            key: 'id'
        }
    }
})