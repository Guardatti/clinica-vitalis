import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { STATES_SPECIALITIES } from "../helpers/constants";

export interface ISpeciality {
    id: number;
    name: string;
    state?: string;
}

interface ISpecialityAttributes extends Optional<ISpeciality, 'id'> {}

interface SpecialityInstance extends Model<ISpeciality, ISpecialityAttributes>, ISpeciality {}


export const Speciality = sequelize.define<SpecialityInstance>('Especialidades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    state: {
        type: DataTypes.ENUM(...Object.values(STATES_SPECIALITIES)),
        allowNull: false,
        defaultValue: STATES_SPECIALITIES.active
    }
})