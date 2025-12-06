import type { IconType } from "react-icons";
import { FaHospital, FaUserMd, FaProcedures, FaUserAlt, FaUserPlus, FaBriefcaseMedical, FaStethoscope } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";




interface IAsideItem {
    id: number;
    to: string;
    icon: IconType;
    text: string;
}

export const asideWithCurrentUser: IAsideItem[] = [
    {
        id: 1,
        to: '/inicio',
        icon: FaHospital,
        text: 'Inicio'
    },
    {
        id: 2,
        to: '/profesionales',
        icon: FaUserMd,
        text: 'Profesionales'
    },
    {
        id: 3,
        to: '/pacientes',
        icon: FaProcedures,
        text: 'Pacientes'
    },
    {
        id: 4,
        to: '/turnos',
        icon: FaCalendarCheck,
        text: 'Turnos'
    },
    {
        id: 5,
        to: '/obras_sociales',
        icon: FaBriefcaseMedical,
        text: 'Obras sociales'
    },
    {
        id: 6,
        to: '/especialidades',
        icon: FaStethoscope,
        text: 'Especialidades'
    },
    {
        id: 7,
        to: '/horarios',
        icon: MdWorkHistory,
        text: 'Horarios'
    },
    {
        id: 8,
        to: '/configuraciones',
        icon: IoMdSettings,
        text: 'Configuración'
    },
]

export const asideWithoutCurrentUser: IAsideItem[] = [
    {
        id: 9,
        to: '/cuenta/inicio-de-sesion',
        icon: FaUserAlt,
        text: 'Iniciar sesión'
    },
    {
        id: 10,
        to: '/cuenta/registro',
        icon: FaUserPlus,
        text: 'Registrarse'
    },
]