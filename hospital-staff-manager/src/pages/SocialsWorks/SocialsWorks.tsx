import React, { useEffect, useRef, useState } from 'react'
import './socialsWorks.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';
import { useForm } from 'react-hook-form';
import type { ISocialWork } from '../../utils/socialsWorks';
import { getSocialsWorks } from '../../fetch/fetchSocialsWorks';
import { MdVisibility, MdEdit } from "react-icons/md";



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
            <div>
                <h3>Obras sociales</h3>
            </div>
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register('search')} type="text" placeholder='Nombre de la obra social...'/>
                </div>
                <div>
                    <select {...register('state')}>
                        <option value="">Estado</option>
                        <option value="Activa">Activa</option>
                        <option value="Inactiva">Inactiva</option>
                    </select>
                </div>
                <div>
                    <button><CiSearch /></button>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading && !socialsWorks ?
                        <tr>
                            <td>
                                <div className='spinner-socials-works'/>
                            </td>
                        </tr>
                        :
                        socialsWorks?.length > 0 ?
                        socialsWorks.map((x) => {
                            return(
                                <tr key={x.id}>
                                    <td>{x.name}</td>
                                    <td>{x.state}</td>
                                    <td><MdVisibility /><MdEdit /></td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td>No hay obras sociales cargadas</td>
                        </tr>
                    }
                </tbody>
            </table>
        </section>
    )
}

export default SocialsWorks
