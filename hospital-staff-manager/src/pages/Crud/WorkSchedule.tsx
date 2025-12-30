import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../redux/hooks';
import Swal from 'sweetalert2';
import './crud.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { IProfessional } from '../../utils/professionals';
import { getProfessionals } from '../../fetch/fetchProfessionals';
import { days, schedules, type IWorkSchedule } from '../../utils/workSchedules';
import { createWorkSchedule, getWorkScheduleById, updateWorkSchedule } from '../../fetch/fetchWorkSchudles';




const WorkSchedule: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const { id } = useParams();

    const location = useLocation();

    const isRead = location.pathname.includes('consultar')

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IWorkSchedule>()

    const [professionals, setProfessionals] = useState<IProfessional[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async (data: IWorkSchedule) => {

        try {
            
            setLoading(true)

            if (!id) {

                const newWorkSchedule = await createWorkSchedule(currentUser, data)
                
                if (newWorkSchedule) {
                    Swal.fire({
                        title: "¡Horario creado!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/horarios')

                }

                reset();

            }

            if (id) {

                const saveChanges = await updateWorkSchedule(currentUser, data, id)

                if (saveChanges) {
                    Swal.fire({
                        title: "¡Horario actualizado!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/horarios')

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

                const dataProfessional = await getProfessionals(currentUser)

                setProfessionals(dataProfessional)

                if (id) {

                    const data = await getWorkScheduleById(currentUser, id)

                    reset(data)

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
                professionals.length > 0 ?
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className='container-create-title'>
                        {
                            isRead ?
                            <h2>Consulta de horario</h2>
                            :
                            id ?
                            <h2>Editar horario</h2>
                            : 
                            <h3>Crear horario</h3>
                        }
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
                        <select {...register('dayOfWeek', { required: true })} disabled={isRead}>
                            <option value="">Día</option>
                            {
                                days.map((x) => {
                                    return(
                                        <option value={x.value} key={x.id}>{x.name}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.dayOfWeek && <span style={{fontSize: '12px', color: 'red'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('startTime', { required: true })} disabled={isRead}>
                            <option value="">Horario de inicio</option>
                            {
                                schedules.map((x) => {
                                    return(
                                        <option value={x.value} key={x.id}>{x.value}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.startTime && <span style={{fontSize: '12px', color: 'red'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('endTime', { required: true })} disabled={isRead}>
                            <option value="">Horario de fin</option>
                            {
                                schedules.map((x) => {
                                    return(
                                        <option value={x.value} key={x.id}>{x.value}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.endTime && <span style={{fontSize: '12px', color: 'red'}}>Campo obligatorio</span>}
                    </div>
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
                <span>¡Error! Para crear o editar un horario se necesitan profesionales.</span>
            }
        </section>
    )
}

export default WorkSchedule
