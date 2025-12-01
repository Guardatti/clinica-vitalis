import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { STATES_PATIENTS } from "../helpers/constants";


export interface IPatients {
    id: number;
    name: string;
    surname: string;
    dni: number;
    birthdate: Date;
    gender: string;
    address: string;
    phone: string;
    email: string;
    socialWorkId: number;
    state?: string;
}

interface IPatientsAttributes extends Optional<IPatients, 'id'> {}

interface PatientInstance extends Model<IPatients, IPatientsAttributes>, IPatients {}

export const Patients = sequelize.define<PatientInstance>('Pacientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    socialWorkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Obras_Sociales",
            key: "id"
        }
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: STATES_PATIENTS.active
    }
})