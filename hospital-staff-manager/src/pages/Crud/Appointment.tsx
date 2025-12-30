import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../redux/hooks';
import Swal from 'sweetalert2';
import './crud.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { IProfessional } from '../../utils/professionals';
import { getProfessionals } from '../../fetch/fetchProfessionals';
import type { IAppointment } from '../../utils/appointments';
import { createAppointment, getAppointmentsById, updateAppointment } from '../../fetch/fetchAppointements';
import type { IPatient } from '../../utils/patients';
import { getPatients } from '../../fetch/fetchPatients';
import { schedules } from '../../utils/workSchedules';




const Appointment: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const { id } = useParams();

    const location = useLocation();

    const isRead = location.pathname.includes('consultar')

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IAppointment>()

    const [patients, setPatients] = useState<IPatient[]>([])

    const [professionals, setProfessionals] = useState<IProfessional[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const navigate = useNavigate()

    const today = new Date().toISOString().split('T')[0];

    const onSubmit = async (data: IAppointment) => {

        try {
            
            setLoading(true)

            if (!id) {

                const newAppointment = await createAppointment(currentUser, data)
                
                if (newAppointment) {
                    Swal.fire({
                        title: "¡Turno creado!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/turnos')

                }

                reset();

            }

            if (id) {

                const saveChanges = await updateAppointment(currentUser, data, id)

                if (saveChanges) {
                    Swal.fire({
                        title: "¡Turno actualizado!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/turnos')

                }

                reset();
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(( ) => {
    
        const loadData = async (): Promise<void> => {

            try {

                setLoadingForm(true)

                const [dataPatients, dataProfessionals] = await Promise.all([
                    getPatients(currentUser),
                    getProfessionals(currentUser)
                ])

                setPatients(dataPatients)
                setProfessionals(dataProfessionals.professionals)

                if (id) {

                    const data = await getAppointmentsById(currentUser, id)

                    let datePart = '';
                    let timePart = '';

                    if (data.date) {

                        const dateObj = new Date(data.date);
                        
                        datePart = dateObj.toLocaleDateString('en-CA');

                        timePart = dateObj.toLocaleTimeString('es-AR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        });

                        if (timePart.length === 4) timePart = "0" + timePart;

                    }

                    reset({
                        ...data,
                        date: datePart,
                        time: timePart
                    })

                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoadingForm(false)
            }
        }

        loadData();

    }, [currentUser, id, reset])

    return (
        <section className='container-create'>
            {
                loadingForm ?
                <div className='container-spinner-create-form'>
                    <div className='spinner-form'/>
                </div>
                :
                patients.length > 0 && professionals.length > 0 ?
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className='container-create-title'>
                        {
                            isRead ?
                            <h2>Consulta de turno</h2>
                            :
                            id ?
                            <h2>Editar turno</h2>
                            : 
                            <h3>Crear turno</h3>
                        }
                    </div>
                    <div className='container-create-input'>
                        <select {...register('patientID', { required: true })} disabled={isRead}>
                            <option value="">Paciente</option>
                            {
                                patients.map((x) => {
                                    return(
                                        <option value={x.id} key={x.id}>{x.name} {x.surname} | {x.dni}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.patientID && <span style={{fontSize: '12px', color: 'red'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('professionalID', { required: true })} disabled={isRead}>
                            <option value="">Profesional</option>
                            {
                                professionals.map((x) => {
                                    return(
                                        <option value={x.id} key={x.id}>{x.name} {x.surname} | {x.Especialidade?.name}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.professionalID && <span style={{fontSize: '12px', color: 'red'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="date"
                        {...register('date', {required: true})}
                        min={today}
                        disabled={isRead}
                        />
                        {errors.date && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('time', { required: true })} disabled={isRead}>
                            <option value="">Seleccione un horario</option>
                            {
                                schedules.map((x) => {
                                    return(
                                        <option key={x.id}>{x.value}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.date && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <textarea
                        {...register('description', {required: true})}
                        placeholder='Descripción'
                        disabled={isRead}
                        />
                        {errors.description && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    {
                        id &&
                        <div className='container-create-input'>
                            <select {...register('state', { required: true })} disabled={isRead}>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Atendido">Atendido</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Ausente">Ausente</option>
                            </select>
                            {errors.state && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                        </div>
                    }
                    <div className='container-create-button'>
                        {
                            loading ?
                            <button className='loading-create-form' disabled={true}>
                                <div className='spinner-create-form'/>
                            </button>
                            :
                            isRead ?
                            <div />
                            :
                            id ?
                            <button>Guardar</button>
                            :
                            <button>Crear</button>
                        }
                    </div>
                </form>
                :
                <span>¡Error! Para crear o editar un turno se necesitan profesionales (con horarios de trabajo) y pacientes registrados.</span>
            }
        </section>
    )
}

export default Appointment
