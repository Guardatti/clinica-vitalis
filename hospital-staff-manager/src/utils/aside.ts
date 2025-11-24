import type { IconType } from "react-icons";
import { FaHospital, FaUserMd, FaProcedures, FaUserAlt, FaUserPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";



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
        to: '/configuraciones',
        icon: IoMdSettings,
        text: 'Configuración'
    },
]

export const asideWithoutCurrentUser: IAsideItem[] = [
    {
        id: 5,
        to: '/cuenta/inicio-de-sesion',
        icon: FaHospital,
        text: 'Inicio'
    },
    {
        id: 6,
        to: '/cuenta/inicio-de-sesion',
        icon: FaUserMd,
        text: 'Profesionales'
    },
    {
        id: 7,
        to: '/cuenta/inicio-de-sesion',
        icon: FaProcedures,
        text: 'Pacientes'
    },
    {
        id: 8,
        to: '/cuenta/inicio-de-sesion',
        icon: FaUserAlt,
        text: 'Iniciar sesión'
    },
    {
        id: 9,
        to: '/cuenta/registro',
        icon: FaUserPlus,
        text: 'Registrarse'
    },
]