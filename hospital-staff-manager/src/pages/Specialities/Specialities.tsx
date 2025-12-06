import React, { useEffect, useRef, useState } from 'react'
import './specialities.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';
import { useForm } from 'react-hook-form';
import { MdEdit } from "react-icons/md";
import type { ISpeciality } from '../../utils/speciality';
import { getSpecialities } from '../../fetch/fetchSpecialities';



interface FormData {
    search: string;
    state: string;
}

const Specialities: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const [loading, setLoading] = useState<boolean>(false);

    const [specialities, setSpecialities] = useState<ISpeciality[]>([])

    const { register, handleSubmit } = useForm<FormData>()

    const form = useRef<HTMLFormElement>(null);

    const onSubmit = async (data: FormData) => {

        try {
            
            setLoading(true)

            await new Promise(resolve => setTimeout(resolve, 1000)); 

            const response: ISpeciality[] = await getSpecialities(currentUser, data);

            setSpecialities(response);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(( ) => {

        const findSocialsWorks = async (): Promise<void> => {

            try {

                setLoading(true)

                await new Promise(resolve => setTimeout(resolve, 1000)); 
                
                const response: ISpeciality[] = await getSpecialities(currentUser);

                setSpecialities(response)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }

        findSocialsWorks();

    }, [currentUser])

    return (
        <section className='container-specialities'>
            <div className='container-specialities-title'>
                <h3>Especialidades</h3>
            </div>
            <div className='container-specialities-btn-and-form'>
                <div className='container-btn-new-speciality'>
                    <button>+ Crear especialidad</button>
                </div>
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className='form-specialities'>
                    <div className='container-input-speciality'>
                        <input {...register('search')} type="text" placeholder='Nombre de la especialidad...'/>
                    </div>
                    <div className='container-select-speciality'>
                        <select {...register('state')}>
                            <option value="">Estado</option>
                            <option value="Activa">Activa</option>
                            <option value="Inactiva">Inactiva</option>
                        </select>
                    </div>
                    <div className='container-btn-search-speciality'>
                        <button><CiSearch /></button>
                    </div>
                </form>
            </div>
            <div className='table-container-speciality'>
                <table className='table-speciality'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan={3}>
                                    <div className='spinner-speciality'/>
                                </td>
                            </tr>
                            :
                            specialities?.length > 0 ?
                            specialities.map((x) => {
                                return(
                                    <tr key={x.id}>
                                        <td>{x.name}</td>
                                        <td >
                                            <span className={`status ${x.state === 'Activa' ? 'status-active' : 'status-inactive'}`}>
                                                {x.state}
                                            </span>
                                        </td>
                                        <td className='container-icons-speciality'>
                                            <MdEdit style={{color: 'fd7e14', cursor: 'pointer', fontSize: '1rem'}}/>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={3} style={{textAlign: 'center'}}>No hay especialidades cargadas</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Specialities
