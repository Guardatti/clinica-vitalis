import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ISocialWork } from '../../../utils/socialsWorks';
import { createSocialWork } from '../../../fetch/fetchSocialsWorks';
import { useAppSelector } from '../../../redux/hooks';
import Swal from 'sweetalert2';
import './create.css'
import { useNavigate } from 'react-router-dom';




const SocialWork: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const {register, handleSubmit, formState: {errors}, reset} = useForm<ISocialWork>()

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async (data: ISocialWork) => {

        try {
            
            setLoading(true)

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

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <section className='container-create'>
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <div className='container-create-title'>
                    <h2>Crear obra social</h2>
                </div>
                <div className='container-create-input'>
                    <input
                    type="text"
                    {...register('name', {required: true})}
                    placeholder='Nombre'
                    />
                    {errors.name && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-create-input'>
                    <input
                    type="text"
                    {...register('address', {required: true})}
                    placeholder='Dirección'
                    />
                    {errors.address && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-create-input'>
                    <input
                    type="tel"
                    {...register('phone', {required: true})}
                    placeholder='Teléfono o celular'
                    />
                    {errors.phone && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-create-input'>
                    <input
                    type="text"
                    {...register('webpage', {required: true})}
                    placeholder='Página web'
                    />
                    {errors.webpage && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-create-button'>
                    {
                        loading ?
                        <button className='loading-create-form' disabled={true}>
                            <div className='spinner-create-form'/>
                        </button>
                        :
                        <button>Crear</button>
                    }
                </div>
            </form>
        </section>
    )
}

export default SocialWork
