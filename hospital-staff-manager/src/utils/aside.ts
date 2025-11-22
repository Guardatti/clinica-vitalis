import type { IconType } from "react-icons";
import { FaHospital, FaUserMd, FaProcedures, FaSignOutAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

interface IAsideItem {
    id: number;
    to: string;
    icon: IconType;
    text: string;
}

export const aside: IAsideItem[] = [
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
    {
        id: 5,
        to: '/',
        icon: FaSignOutAlt,
        text: 'Cerrar sesión'
    },
]