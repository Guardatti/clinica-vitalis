import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import './settings.css'



const Settings: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    return (
        <section className='container-settings'>
            <div className='settings'>
                <div className='settings-title'>
                    <h3>Datos personales</h3>
                </div>
                <div className='container-personal-data'>
                    <div className='container-data'>
                        <label>Nombre</label>
                        <p>{currentUser?.name}</p>
                    </div>
                    <div className='container-data'>
                        <label>Apellido</label>
                        <p>{currentUser?.surname}</p>
                    </div>
                    <div className='container-data'>
                        <label>Email</label>
                        <p>{currentUser?.email}</p>
                    </div>
                    <div className='container-data'>
                        <label>Rol</label>
                        {
                            currentUser?.rol === '50yun4dmin' ? 
                            <p>Admin</p>
                            :
                            <p>Usuario</p>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Settings
