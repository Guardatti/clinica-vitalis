import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { Patients } from "./patients";
import { Professionals } from "./professionals";
import { STATES_APPOINTMENTS } from "../helpers/constants";

export interface IAppointment {
    id: number;
    patientID: number;
    professionalID: number;
    date: string;
    time: string;
    description: string;
    state?: string;
}

interface IAppointmentsAttributes extends Optional<IAppointment, 'id'> {}

interface AppointementInstance extends Model<IAppointment, IAppointmentsAttributes>, IAppointment {}

export const Appointments = sequelize.define<AppointementInstance>('Turnos', {
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
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.ENUM(...Object.values(STATES_APPOINTMENTS)), 
        defaultValue: STATES_APPOINTMENTS.pending,
        allowNull: false,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['patientID', 'date', 'time'],
            name: 'unique_appointment_per_patient'
        },
        {
            unique: true,
            fields: ['professionalID', 'date','time'],
            name: 'unique_appointment_per_pro' 
        }
    ]
});