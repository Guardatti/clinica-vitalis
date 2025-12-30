import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ISocialWork } from '../../utils/socialsWorks';
import { createSocialWork, getSocialWorkById, updateSocialWork } from '../../fetch/fetchSocialsWorks';
import { useAppSelector } from '../../redux/hooks';
import Swal from 'sweetalert2';
import './crud.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';




const SocialWork: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const { id } = useParams();

    const location = useLocation();

    const isRead = location.pathname.includes('consultar')

    const {register, handleSubmit, formState: {errors}, reset} = useForm<ISocialWork>()

    const [loading, setLoading] = useState<boolean>(false)

    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async (data: ISocialWork) => {

        try {
            
            setLoading(true)

            if (!id) {

                const newSocialWork = await createSocialWork(currentUser, data)
                
                if (newSocialWork) {
                    Swal.fire({
                        title: "¡Obra social creada!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/obras_sociales')

                }

                reset();

            }

            if (id) {

                const saveChanges = await updateSocialWork(currentUser, data, id)

                if (saveChanges) {
                    Swal.fire({
                        title: "¡Obra social actualizada!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/obras_sociales')

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

                if (id) {

                    const data = await getSocialWorkById(currentUser, id);
                    
                    reset(data); 
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
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className='container-create-title'>
                        {
                            isRead ?
                            <h2>Consulta de obra social</h2>
                            :
                            id ?
                            <h2>Editar obra social</h2>
                            : 
                            <h3>Crear obra social</h3>
                        }
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="text"
                        {...register('name', {required: true})}
                        placeholder='Nombre'
                        disabled={isRead}
                        />
                        {errors.name && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="text"
                        {...register('address', {required: true})}
                        placeholder='Dirección'
                        disabled={isRead}
                        />
                        {errors.address && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="tel"
                        {...register('phone', {required: true})}
                        placeholder='Teléfono o celular'
                        disabled={isRead}
                        />
                        {errors.phone && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="text"
                        {...register('webpage', {required: true})}
                        placeholder='Página web'
                        disabled={isRead}
                        />
                        {errors.webpage && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    {
                        id &&
                        <div className='container-create-input'>
                            <select {...register('state', { required: true })} disabled={isRead}>
                                <option value="Activa">Activa</option>
                                <option value="Inactiva">Inactiva</option>
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
            }
        </section>
    )
}

export default SocialWork
