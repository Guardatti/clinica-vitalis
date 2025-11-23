import express, { Express } from "express"
import cors from "cors"
import { sequelize } from "../database/config";
import { Professionals } from "./professionals";
import { Patients } from "./patients";
import { Shifts } from "./shifts";


export class Server {

    app: Express;
    port: string | number | undefined;

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.establishAssociations();
        this.connectionToDB();
        this.middlewares();
    }

    establishAssociations(): void {
        // Relación Muchos a Muchos (N:M)
        Professionals.belongsToMany(Patients, { through: Shifts, foreignKey: 'professionalID' });
        Patients.belongsToMany(Professionals, { through: Shifts, foreignKey: 'patientID' });
    
        // Turno (1 -> 1) Profesional
        Shifts.belongsTo(Professionals, { foreignKey: 'professionalID' });
        // Profesional (1 -> 1..*) Turnos
        Professionals.hasMany(Shifts, { foreignKey: 'professionalID' });
    
        // Turno (1 -> 1) Paciente
        Shifts.belongsTo(Patients, { foreignKey: 'patientID' });
        // Paciente (1 -> 1..*) Turno
        Patients.hasMany(Shifts, { foreignKey: 'patientID' });
    }

    async connectionToDB(): Promise<void> {
        await sequelize.sync()
    }

    middlewares(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }

    listen(): void {

        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en el puerto ${this.port}`);
            
        })
    }

}