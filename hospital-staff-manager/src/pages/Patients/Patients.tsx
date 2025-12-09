import React, { useEffect, useRef, useState } from 'react'
import './patients.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';
import { useForm } from 'react-hook-form';
import { MdVisibility, MdEdit } from "react-icons/md";
import type { IPatient } from '../../utils/patients';
import { getPatients } from '../../fetch/fetchPatients';
import { getSocialsWorks } from '../../fetch/fetchSocialsWorks';
import type { ISocialWork } from '../../utils/socialsWorks';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



interface FormData {
    search: string;
    gender: string;
    socialWorkId: string;
    state: string;
}

const Patients: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const [loading, setLoading] = useState<boolean>(false);

    const [patients, setPatients] = useState<IPatient[]>([])

    const [socialsWorks, setSocialsWorks] = useState<ISocialWork[]>([])

    const { register, handleSubmit } = useForm<FormData>()

    const form = useRef<HTMLFormElement>(null);

    const navigate = useNavigate()

    const onSubmit = async (data: FormData) => {

        try {
            
            setLoading(true)

            await new Promise(resolve => setTimeout(resolve, 1000)); 

            const response: IPatient[] = await getPatients(currentUser, data);

            setPatients(response)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(( ) => {

        const findPatients = async (): Promise<void> => {

            try {

                setLoading(true)

                await new Promise(resolve => setTimeout(resolve, 1000)); 
                
                const [patientsData, socialsWorksData] = await Promise.all([
                        getPatients(currentUser),
                        getSocialsWorks(currentUser)
                ]);

                setPatients(patientsData)
                setSocialsWorks(socialsWorksData)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }

        findPatients();

    }, [currentUser])

    return (
        <section className='container-patients'>
            <div className='container-patients-title'>
                <h3>Pacientes</h3>
            </div>
            <div className='container-patients-btn-and-form'>
                <div className='container-btn-new-patient'>
                    <button onClick={() => navigate('/pacientes/crear')}>+ Crear paciente</button>
                </div>
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className='form-patients'>
                    <div className='container-input-patient'>
                        <input {...register('search')} type="text" placeholder='Nombre, apellido o DNI...'/>
                    </div>
                    <div className='container-select-patient'>
                        <select {...register('gender')}>
                            <option value="">Género</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                        </select>
                    </div>
                    {
                        socialsWorks?.length > 0 &&
                        <div className='container-select-patient'>
                            <select {...register('socialWorkId')}>
                                <option value="">Obras sociales</option>
                                {
                                    socialsWorks.map((x) => {
                                        return(
                                            <option value={x.id} key={x.id}>{x.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    }
                    <div className='container-select-patient'>
                        <select {...register('state')}>
                            <option value="">Estado</option>
                            <option value="Activo/a">Activo</option>
                            <option value="Inactivo/a">Inactivo</option>
                        </select>
                    </div>
                    <div className='container-btn-search-patient'>
                        <button><CiSearch /></button>
                    </div>
                </form>
            </div>
            <div className='table-container-patient'>
                <table className='table-patient'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan={5}>
                                    <div className='spinner-patient'/>
                                </td>
                            </tr>
                            :
                            patients?.length > 0 ?
                            patients.map((x) => {
                                return(
                                    <tr key={x.id}>
                                        <td>{x.name}</td>
                                        <td>{x.surname}</td>
                                        <td>{x.dni}</td>
                                        <td >
                                            <span className={`status ${x.state === 'Activo/a' ? 'status-active' : 'status-inactive'}`}>
                                                {x.state}
                                            </span>
                                        </td>
                                        <td className='container-icons-patient'>
                                            <MdVisibility style={{color: '#546E7A', cursor: 'pointer', fontSize: '1rem'}}/>
                                            <MdEdit style={{color: '#1976D2', cursor: 'pointer', fontSize: '1rem'}}/>
                                            <FaTrashAlt style={{color: '#FF3B30', cursor: 'pointer', fontSize: '1rem'}}/>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={5} style={{textAlign: 'center'}}>No hay pacientes cargados</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Patients
