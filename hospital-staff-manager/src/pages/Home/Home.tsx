import React, { useEffect, useState } from 'react'
import './home.css'
import { useAppSelector } from '../../redux/hooks';
import { getAppointments } from '../../fetch/fetchAppointements';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { MdEdit, MdVisibility } from 'react-icons/md';
import type { IAppointment } from '../../utils/appointments';
import { getProfessionals } from '../../fetch/fetchProfessionals';




const Home: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const today = new Date().toLocaleDateString()

    const [countAppointment, setCountAppointment] = useState<number>(0)

    const [countCancelledAppointments, setCountCancelledAppointments] = useState<number>(0)

    const [countActivesProfessionals, setCountActivesProfessionals] = useState<number>(0)

    const [appointments, setAppointments] = useState<IAppointment[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    useEffect(() => {

        const find = async () => {

            try {

                setLoading(true)

                const [{ appointmentsOfToday, countAppointments, countCancelled }, { countActives }] = await Promise.all([
                    getAppointments(currentUser),
                    getProfessionals(currentUser)
                ])

                setAppointments(appointmentsOfToday)
                setCountAppointment(countAppointments)
                setCountCancelledAppointments(countCancelled)
                setCountActivesProfessionals(countActives)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }

        find();

    }, [currentUser])

    return (
        <section className='container-home'>
            {
                loading ?
                <div className='spinner-appointment'/>
                :
                <div>
                    <div className='container-home-title-cards'>
                        <h3>Bienvenido, {currentUser?.name}. Hoy es {today}.</h3>
                        <div className='container-home-cards'>
                            <div>
                                <span>📅 Turnos hoy: {countAppointment}</span>
                            </div>
                            <div>
                                <span>👨‍⚕️ Médicos activos: {countActivesProfessionals}</span>
                            </div>
                            <div>
                                <span>⚠️ Turnos cancelados: {countCancelledAppointments}</span>
                            </div>
                        </div>
                    </div>
                    <div className='container-home-title-table'>
                        <h3>Agenda del día</h3>
                        <div className='container-home-table'>
                            <table className='table-home'>
                                <thead>
                                    <tr>
                                        <th>Hora</th>
                                        <th>Paciente</th>
                                        <th>Profesional</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>    
                                <tbody>
                                    {
                                        appointments?.length > 0 ?
                                        appointments.map((x) => {
                                            return(
                                                <tr key={x.id}>
                                                    <td>{format(new Date(x.date), "HH:mm")}</td>
                                                    <td>{x.Paciente?.name} {x.Paciente?.surname}</td>
                                                    <td>{x.Profesionale?.name} {x.Profesionale?.surname}</td>
                                                    <td>
                                                        <span style={{
                                                            color: x.state === 'Pendiente' ? '#1565C0' : 
                                                                            x.state === 'Atendido' ? '#28A745' : 
                                                                            x.state === 'Cancelado' ? 'rgb(255,0,0)' : '#E65100'
                                                        }}>
                                                            {x.state}
                                                        </span>
                                                    </td>
                                                    <td className='container-icons-appointment'>
                                                        <MdVisibility style={{color: '#1976D2', cursor: 'pointer', fontSize: '1rem'}} onClick={() => navigate(`/turnos/consultar/${x.id}`)}/>
                                                        <MdEdit style={{color: '#e29b00', cursor: 'pointer', fontSize: '1rem'}} onClick={() => navigate(`/turnos/editar/${x.id}`)}/>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan={6} style={{textAlign: 'center'}}>Sin turnos</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='container-home-title-actions'>
                        <h3>Acciones rápidas</h3>
                        <div className='container-home-actions'>
                            <button onClick={() => navigate('/turnos/crear')}>+ Nuevo turno</button>
                            <button onClick={() => navigate('/pacientes/crear')}>+ Crear paciente</button>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default Home
