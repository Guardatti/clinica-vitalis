import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { Patients } from "./patients";
import { Professionals } from "./professionals";

interface IShifts {
    id: number;
    fecha: Date;
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
    fecha: {
        type: DataTypes.DATE,
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