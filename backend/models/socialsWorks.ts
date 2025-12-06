import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { STATES_SOCIALSWORKS } from "../helpers/constants";

export interface ISocialsWorks {
    id: number;
    name: string;
    state?: string;
    address: string;
    phone: string;
    webpage: string;
}

interface ISocialsWorksAttributes extends Optional<ISocialsWorks, 'id'> {}

interface SocialWorkInstance extends Model<ISocialsWorks, ISocialsWorksAttributes>, ISocialsWorks {}


export const SocialsWorks = sequelize.define<SocialWorkInstance>('Obras_Sociales', {
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
        type: DataTypes.ENUM(...Object.values(STATES_SOCIALSWORKS)),
        allowNull: false,
        defaultValue: STATES_SOCIALSWORKS.active
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    webpage: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})