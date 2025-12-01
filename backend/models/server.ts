import express, { Express } from "express"
import cors from "cors"
import { sequelize } from "../database/config";
import { Professionals } from "./professionals";
import { Patients } from "./patients";
import { Shifts } from "./shifts";
import authRoutes from "../routes/auth"
import patientsRoutes from "../routes/patients"
import professionalsRoutes from "../routes/professionals"
import shiftsRoutes from "../routes/shifts"
import socialsWorksRoutes from "../routes/socialsWorks"
import { SocialsWorks } from "./socialsWorks";



export class Server {

    app: Express;
    port: string | number | undefined;
    authPath: string;
    patientsPath: string;
    professionalsPath: string;
    shiftsPath: string;
    socialsWorksPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.authPath = '/auth';
        this.patientsPath = '/patients';
        this.professionalsPath = '/professionals';
        this.shiftsPath = '/shifts';
        this.socialsWorksPath = '/socials_works';
        this.establishAssociations();
        this.connectionToDB();
        this.middlewares();
        this.routes();
    }

    establishAssociations(): void {
        // Relación Muchos a Muchos (N:M)
        Professionals.belongsToMany(Patients, { through: Shifts, foreignKey: 'professionalID' });
        Patients.belongsToMany(Professionals, { through: Shifts, foreignKey: 'patientID' });
    
        // "Obra social (1 -> 1..*) Pacientes
        SocialsWorks.hasMany(Patients, { foreignKey: 'socialWorkId' });
        // Paciente (1 -> 1) Obra social
        Patients.belongsTo(SocialsWorks, { foreignKey: 'socialWorkId' });

        // Profesional (1 -> 1..*) Turnos
        Professionals.hasMany(Shifts, { foreignKey: 'professionalID' });
        // Turno (1 -> 1) Profesional
        Shifts.belongsTo(Professionals, { foreignKey: 'professionalID' });

        // Paciente (1 -> 1..*) Turno
        Patients.hasMany(Shifts, { foreignKey: 'patientID' });
        // Turno (1 -> 1) Paciente
        Shifts.belongsTo(Patients, { foreignKey: 'patientID' });
    }

    async connectionToDB(): Promise<void> {
        await sequelize.sync()
    }

    middlewares(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(): void {
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.patientsPath, patientsRoutes)
        this.app.use(this.professionalsPath, professionalsRoutes)
        this.app.use(this.shiftsPath, shiftsRoutes)
        this.app.use(this.socialsWorksPath, socialsWorksRoutes)
    }

    listen(): void {

        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en el puerto ${this.port}`);
            
        })
    }

}