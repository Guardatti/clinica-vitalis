import React, { useEffect, useRef, useState } from 'react'
import './appointments.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';
import { useForm } from 'react-hook-form';
import { MdVisibility, MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import type { IProfessional } from '../../utils/professionals';
import { getProfessionals } from '../../fetch/fetchProfessionals';
import type { IAppointment } from '../../utils/appointments';
import { getAppointments } from '../../fetch/fetchAppointements';
import { format } from 'date-fns';



interface FormData {
    search: string;
    professionalID: string;
    state: string;
}

const Appointments: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const [loading, setLoading] = useState<boolean>(false);

    const [appointments, setAppointments] = useState<IAppointment[]>([])

    const [professionals, setProfessionals] = useState<IProfessional[]>([])

    const { register, handleSubmit } = useForm<FormData>()

    const form = useRef<HTMLFormElement>(null);

    const navigate = useNavigate()

    const onSubmit = async (data: FormData) => {

        try {
            
            setLoading(true)

            const response: IAppointment[] = await getAppointments(currentUser, data);

            setAppointments(response.appointments)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(( ) => {

        const findAppointments = async (): Promise<void> => {

            try {

                setLoading(true)

                const [appointmentsData, professionalsData] = await Promise.all([
                        getAppointments(currentUser),
                        getProfessionals(currentUser)
                ]);

                setAppointments(appointmentsData.appointments)
                setProfessionals(professionalsData)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }

        findAppointments();

    }, [currentUser])

    return (
        <section className='container-appointments'>
            <div className='container-appointments-title'>
                <h3>Turnos</h3>
            </div>
            <div className='container-appointments-btn-and-form'>
                <div className='container-btn-new-appointment'>
                    <button onClick={() => navigate('/turnos/crear')}>+ Crear turno</button>
                </div>
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className='form-appointments'>
                    <div className='container-input-appointment'>
                        <input {...register('search')} type="text" placeholder='DNI paciente...'/>
                    </div>
                    {
                        professionals?.length > 0 &&
                        <div className='container-select-appointment'>
                            <select {...register('professionalID')}>
                                <option value="">Profesionales</option>
                                {
                                    professionals.map((x) => {
                                        return(
                                            <option value={x.id} key={x.id}>{x.name} {x.surname} | {x.Especialidade?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    }
                    <div className='container-select-appointment'>
                        <select {...register('state')}>
                            <option value="">Estado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Atendido">Atendido</option>
                            <option value="Cancelado">Cancelado</option>
                            <option value="Ausente">Ausente</option>
                        </select>
                    </div>
                    <div className='container-btn-search-appointment'>
                        <button><CiSearch /></button>
                    </div>
                </form>
            </div>
            <div className='table-container-appointment'>
                <table className='table-appointment'>
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan={6}>
                                    <div className='spinner-appointment'/>
                                </td>
                            </tr>
                            :
                            appointments?.length > 0 ?
                            appointments.map((x) => {
                                return(
                                    <tr key={x.id}>
                                        <td>{x.Paciente?.name} {x.Paciente?.surname}</td>
                                        <td>{format(new Date(x.date), "dd/MM/yyyy")}</td>
                                        <td>{format(new Date(x.date), "HH:mm")}</td>
                                        <td>
                                            <span style={{
                                                color: x.state === 'Pendiente' ? '#1565C0' : 
                                                                x.state === 'Atendido' ? '#28A745' : 
                                                                x.state === 'Cancelado' ? 'rgb(255,0,0)' : '#E65100'
                                            }}>
                                                {x.state}
                                            </span>
                                        </td>
                                        <td data-label="Acciones" className='container-icons-appointment'>
                                            <MdVisibility style={{color: '#1976D2', cursor: 'pointer', fontSize: '1rem'}} onClick={() => navigate(`/turnos/consultar/${x.id}`)}/>
                                            <MdEdit style={{color: '#e29b00', cursor: 'pointer', fontSize: '1rem'}} onClick={() => navigate(`/turnos/editar/${x.id}`)}/>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={6} style={{textAlign: 'center'}}>No hay turnos cargados</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Appointments
