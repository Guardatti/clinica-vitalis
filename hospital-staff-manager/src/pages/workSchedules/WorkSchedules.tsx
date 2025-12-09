import React, { useEffect, useRef, useState } from 'react'
import './workSchedules.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';
import { useForm } from 'react-hook-form';
import { MdVisibility, MdEdit } from "react-icons/md";
import type { IProfessional } from '../../utils/professionals';
import { getProfessionals } from '../../fetch/fetchProfessionals';
import { DAYS_OF_WEEK, type IWorkSchedule } from '../../utils/workSchedules';
import { getWorkSchudles } from '../../fetch/fetchWorkSchudles';
import { FaTrashAlt } from 'react-icons/fa';



interface FormData {
    professionalID: string;
    dayOfWeek: string;
}

const WorkSchedules: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const [loading, setLoading] = useState<boolean>(false);

    const [workSchedules, setWorkSchedules] = useState<IWorkSchedule[]>([])

    const [professionals, setProfessionals] = useState<IProfessional[]>([])

    const { register, handleSubmit } = useForm<FormData>()

    const form = useRef<HTMLFormElement>(null);

    const onSubmit = async (data: FormData) => {

        try {
            
            setLoading(true)

            await new Promise(resolve => setTimeout(resolve, 1000)); 

            const response: IWorkSchedule[] = await getWorkSchudles(currentUser, data);

            setWorkSchedules(response)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(( ) => {

        const findProfessionals = async (): Promise<void> => {

            try {

                setLoading(true)

                await new Promise(resolve => setTimeout(resolve, 1000)); 
                
                const [workSchedulesData, professionalsData] = await Promise.all([
                        getWorkSchudles(currentUser),
                        getProfessionals(currentUser),
                ]);

                setWorkSchedules(workSchedulesData)

                setProfessionals(professionalsData)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }

        findProfessionals();

    }, [currentUser])

    return (
        <section className='container-workschedules'>
            <div className='container-workschedules-title'>
                <h3>Horarios de trabajo</h3>
            </div>
            <div className='container-workschedules-btn-and-form'>
                <div className='container-btn-new-workschedule'>
                    <button>+ Crear horario</button>
                </div>
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className='form-workschedules'>
                    {
                        professionals?.length > 0 &&
                        <div className='container-select-workschedule'>
                            <select {...register('professionalID')}>
                                <option value="">Profesional</option>
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
                    <div className='container-select-workschedule'>
                        <select {...register('dayOfWeek')}>
                            <option value="">Día</option>
                            <option value="1">Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                            <option value="0">Domingo</option>
                        </select>
                    </div>
                    <div className='container-btn-search-workschedule'>
                        <button><CiSearch /></button>
                    </div>
                </form>
            </div>
            <div className='table-container-workschedule'>
                <table className='table-workschedule'>
                    <thead>
                        <tr>
                            <th>Profesional</th>
                            <th>Día</th>
                            <th>Horario de atención</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan={4}>
                                    <div className='spinner-workschedule'/>
                                </td>
                            </tr>
                            :
                            workSchedules?.length > 0 ?
                            workSchedules.map((x) => {
                                return(
                                    <tr key={x.id}>
                                        <td>{x.Profesionale?.name} {x.Profesionale?.surname}</td>
                                        <td>{DAYS_OF_WEEK[Number(x.dayOfWeek)]}</td>
                                        <td>{x.startTime} a {x.endTime}</td>
                                        <td className='container-icons-workschedule'>
                                            <MdVisibility style={{color: '#546E7A', cursor: 'pointer', fontSize: '1rem'}}/>
                                            <MdEdit style={{color: '#1976D2', cursor: 'pointer', fontSize: '1rem'}}/>
                                            <FaTrashAlt style={{color: '#FF3B30', cursor: 'pointer', fontSize: '1rem'}}/>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={4} style={{textAlign: 'center'}}>No hay horarios cargados</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default WorkSchedules
