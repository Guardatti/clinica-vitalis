import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { STATES_PROFESSIONALS } from "../helpers/constants";

export interface IProfessionals {
    id: number;
    name: string;
    surname: string;
    dni: number;
    birthdate: Date;
    gender: string;
    address: string;
    phone: string;
    email: string;
    specialityID: number;
    state?: string;
}

interface IProfessionalsAttributes extends Optional<IProfessionals, 'id'> {}

interface ProfessionalInstance extends Model<IProfessionals, IProfessionalsAttributes>, IProfessionals {}

export const Professionals = sequelize.define<ProfessionalInstance>('Profesionales', {
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
    specialityID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Especialidades',
            key: 'id'
        }
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: STATES_PROFESSIONALS.active
    }
})