import express, { Express } from "express"
import cors from "cors"
import { sequelize } from "../database/config";
import { Professionals } from "./professionals";
import { Patients } from "./patients";
import { Appointments  } from "./appointments";
import { SocialsWorks } from "./socialsWorks";
import { Speciality } from "./speciality";
import { WorkSchedule } from "./workSchedule";
import authRoutes from "../routes/auth"
import patientsRoutes from "../routes/patients"
import professionalsRoutes from "../routes/professionals"
import appointementsRoutes from "../routes/appointments"
import socialsWorksRoutes from "../routes/socialsWorks"
import specialitiesRoutes from "../routes/speciality"
import workSchedulesRoutes from "../routes/workSchedule"



export class Server {

    app: Express;
    port: string | number | undefined;
    authPath: string;
    patientsPath: string;
    professionalsPath: string;
    AppointmentsPath: string;
    socialsWorksPath: string;
    specialitiesPath: string;
    workSchedulePath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.authPath = '/auth';
        this.patientsPath = '/patients';
        this.professionalsPath = '/professionals';
        this.AppointmentsPath = '/appointments';
        this.socialsWorksPath = '/socials_works';
        this.specialitiesPath = '/specialities';
        this.workSchedulePath = '/work_schedules';
        this.establishAssociations();
        this.connectionToDB();
        this.middlewares();
        this.routes();
    }

    establishAssociations(): void {
        // Relación Muchos a Muchos (N:M)
        Professionals.belongsToMany(Patients, { through: Appointments, foreignKey: 'professionalID' });
        Patients.belongsToMany(Professionals, { through: Appointments, foreignKey: 'patientID' });
    
        // "Obra social (1 -> 1..*) Pacientes
        SocialsWorks.hasMany(Patients, { foreignKey: 'socialWorkId' });
        // Un Paciente pertenece a una Obra Social
        Patients.belongsTo(SocialsWorks, { foreignKey: 'socialWorkId' });

        // Profesional (1 -> 1..*) Turnos
        Professionals.hasMany(Appointments, { foreignKey: 'professionalID' });
        // Un Turno pertenece a un Profesional
        Appointments.belongsTo(Professionals, { foreignKey: 'professionalID' });

        // Paciente (1 -> 1..*) Turno
        Patients.hasMany(Appointments, { foreignKey: 'patientID' });
        // Un Turno pertenece a un Paciente
        Appointments.belongsTo(Patients, { foreignKey: 'patientID' });

        // Especialidad (1 -> 1..*) Profesionales
        Speciality.hasMany(Professionals, { foreignKey: 'specialityID'  });
        // Un Profesional pertenece a una Especialidad
        Professionals.belongsTo(Speciality, { foreignKey: 'specialityID' });

        // Profesional (1 -> 1..*) Horarios de trabajo
        Professionals.hasMany(WorkSchedule, { foreignKey: 'professionalID' });
        // Un horario pertenece a un profesional
        WorkSchedule.belongsTo(Professionals, { foreignKey: 'professionalID' });
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
        this.app.use(this.AppointmentsPath, appointementsRoutes)
        this.app.use(this.socialsWorksPath, socialsWorksRoutes)
        this.app.use(this.specialitiesPath, specialitiesRoutes)
        this.app.use(this.workSchedulePath, workSchedulesRoutes)
    }

    listen(): void {

        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en el puerto ${this.port}`);
            
        })
    }

}