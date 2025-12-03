import React, { useEffect, useRef, useState } from 'react'
import './professionals.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';
import { useForm } from 'react-hook-form';
import { MdVisibility, MdEdit } from "react-icons/md";
import type { IProfessional } from '../../utils/professionals';
import { getProfessionals } from '../../fetch/fetchProfessionals';
import type { ISpeciality } from '../../utils/speciality';
import { getSpecialities } from '../../fetch/fetchSpecialities';



interface FormData {
    search: string;
    gender: string;
    specialityID: string;
    state: string;
}

const Professionals: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const [loading, setLoading] = useState<boolean>(false);

    const [professionals, setProfessionals] = useState<IProfessional[]>([])
    const [specialities, setSpecialities] = useState<ISpeciality[]>([])

    const { register, handleSubmit } = useForm<FormData>()

    const form = useRef<HTMLFormElement>(null);

    const onSubmit = async (data: FormData) => {

        try {
            
            setLoading(true)

            await new Promise(resolve => setTimeout(resolve, 1500)); 

            const response: IProfessional[] = await getProfessionals(currentUser, data);

            setProfessionals(response)

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

                await new Promise(resolve => setTimeout(resolve, 1500)); 
                
                const [professionalsData, specialtiesData] = await Promise.all([
                        getProfessionals(currentUser),
                        getSpecialities(currentUser)
                ]);

                setProfessionals(professionalsData)

                setSpecialities(specialtiesData)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }

        findProfessionals();

    }, [currentUser])

    return (
        <section className='container-professionals'>
            <div className='container-professionals-title'>
                <h3>Profesionales</h3>
            </div>
            <div className='container-professionals-btn-and-form'>
                <div className='container-btn-new-professional'>
                    <button>+ Crear profesional</button>
                </div>
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className='form-professionals'>
                    <div className='container-input-professional'>
                        <input {...register('search')} type="text" placeholder='Nombre, apellido o DNI...'/>
                    </div>
                    <div className='container-select-professional'>
                        <select {...register('gender')}>
                            <option value="">Género</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                        </select>
                    </div>
                    {
                        specialities.length > 0 &&
                        <div className='container-select-professional'>
                            <select {...register('specialityID')}>
                                <option value="">Especialidad</option>
                                {
                                    specialities.map((x) => {
                                        return(
                                            <option value={x.id} key={x.id}>{x.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    }
                    <div className='container-select-professional'>
                        <select {...register('state')}>
                            <option value="">Estado</option>
                            <option value="Activo/a">Activo</option>
                            <option value="Inactivo/a">Inactivo</option>
                        </select>
                    </div>
                    <div className='container-btn-search-professional'>
                        <button><CiSearch /></button>
                    </div>
                </form>
            </div>
            <div className='table-container-professional'>
                <table className='table-professional'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan={5}>
                                    <div className='spinner-professional'/>
                                </td>
                            </tr>
                            :
                            professionals?.length > 0 ?
                            professionals.map((x) => {
                                return(
                                    <tr key={x.id}>
                                        <td>{x.name}</td>
                                        <td>{x.surname}</td>
                                        <td>{x.Especialidade?.name}</td>
                                        <td >
                                            <span className={`status ${x.state === 'Activo/a' ? 'status-active' : 'status-inactive'}`}>
                                                {x.state}
                                            </span>
                                        </td>
                                        <td className='container-icons-professional'>
                                            <MdVisibility style={{color: '007bff', cursor: 'pointer', fontSize: '1rem'}}/>
                                            <MdEdit style={{color: 'fd7e14', cursor: 'pointer', fontSize: '1rem'}}/>
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

export default Professionals
