import React, { useEffect, useRef, useState } from 'react'
import './socialsWorks.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';
import { useForm } from 'react-hook-form';
import type { ISocialWork } from '../../utils/socialsWorks';
import { getSocialsWorks } from '../../fetch/fetchSocialsWorks';
import { MdVisibility, MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';



interface FormData {
    search: string;
    state: string;
}

const SocialsWorks: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const [loading, setLoading] = useState<boolean>(false);

    const [socialsWorks, setSocialsWorks] = useState<ISocialWork[]>([])

    const { register, handleSubmit } = useForm<FormData>()

    const form = useRef<HTMLFormElement>(null);

    const navigate = useNavigate()

    const onSubmit = async (data: FormData) => {

        try {
            
            setLoading(true)

            const response: ISocialWork[] = await getSocialsWorks(currentUser, data);

            setSocialsWorks(response);

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
                
                const response: ISocialWork[] = await getSocialsWorks(currentUser);

                setSocialsWorks(response)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }

        findSocialsWorks();

    }, [currentUser])

    return (
        <section className='container-socials-works'>
            <div className='container-socials-works-title'>
                <h3>Obras sociales</h3>
            </div>
            <div className='container-socials-works-btn-and-form'>
                <div className='container-btn-new-social-work'>
                    <button onClick={() => navigate('/obras_sociales/crear')}>+ Crear obra social</button>
                </div>
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className='form-socials-works'>
                    <div className='container-input-social-work'>
                        <input {...register('search')} type="text" placeholder='Nombre de la obra social...'/>
                    </div>
                    <div className='container-select-social-work'>
                        <select {...register('state')}>
                            <option value="">Estado</option>
                            <option value="Activa">Activa</option>
                            <option value="Inactiva">Inactiva</option>
                        </select>
                    </div>
                    <div className='container-btn-search-social-work'>
                        <button><CiSearch /></button>
                    </div>
                </form>
            </div>
            <div className='table-container-social-work'>
                <table className='table-social-work'>
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
                                    <div className='spinner-social-work'/>
                                </td>
                            </tr>
                            :
                            socialsWorks?.length > 0 ?
                            socialsWorks.map((x) => {
                                return(
                                    <tr key={x.id}>
                                        <td>{x.name}</td>
                                        <td >
                                            <span className={`status ${x.state === 'Activa' ? 'status-active' : 'status-inactive'}`}>
                                                {x.state}
                                            </span>
                                        </td>
                                        <td className='container-icons-social-work'>
                                            <MdVisibility style={{color: '#1976D2', cursor: 'pointer', fontSize: '1rem'}} onClick={() => navigate(`/obras_sociales/consultar/${x.id}`)}/>
                                            <MdEdit style={{color: '#e29b00', cursor: 'pointer', fontSize: '1rem'}} onClick={() => navigate(`/obras_sociales/editar/${x.id}`)}/>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={3} style={{textAlign: 'center'}}>No hay obras sociales cargadas</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default SocialsWorks
