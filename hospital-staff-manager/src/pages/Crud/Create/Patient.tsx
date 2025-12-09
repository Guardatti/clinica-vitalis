import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../redux/hooks';
import Swal from 'sweetalert2';
import './create.css'
import { useNavigate } from 'react-router-dom';
import type { IPatient } from '../../../utils/patients';
import type { ISocialWork } from '../../../utils/socialsWorks';
import { getSocialsWorks } from '../../../fetch/fetchSocialsWorks';
import { createPatient } from '../../../fetch/fetchPatients';




const Patient: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IPatient>()

    const [socialsWorks, setSocialsWorks] = useState<ISocialWork[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async (data: IPatient) => {

        try {
            
            setLoading(true)

            const newPatient = await createPatient(currentUser, data)
            
            if (newPatient) {
                Swal.fire({
                    title: "¡Paciente creado!",
                    icon: "success",
                    draggable: true
                });

                navigate('/pacientes')

            }

            reset();

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(( ) => {

        const findSocialsWorks = async (): Promise<void> => {

            try {

                setLoadingForm(true)

                await new Promise(resolve => setTimeout(resolve, 1000)); 
                
                const response: ISocialWork[] = await getSocialsWorks(currentUser);

                setSocialsWorks(response)

            } catch (error) {
                console.log(error);
            } finally {
                setLoadingForm(false)
            }

        }

        findSocialsWorks();

    }, [currentUser])

    return (
        <section className='container-create'>
            {
                loadingForm ?
                <div className='container-spinner-create-form'>
                    <div className='spinner-form'/>
                </div>
                :
                socialsWorks.length > 0 ?
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className='container-create-title'>
                        <h2>Crear paciente</h2>
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
                        {...register('surname', {required: true})}
                        placeholder='Apellido'
                        />
                        {errors.surname && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="text"
                        {...register('dni', {required: true})}
                        placeholder='DNI'
                        minLength={7}
                        maxLength={9}
                        />
                        {errors.dni && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="date"
                        {...register('birthdate', {required: true})}
                        placeholder='Fecha de nacimiento'
                        />
                        {errors.birthdate && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('gender', { required: true })}>
                            <option value="">Género</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                        </select>
                        {errors.gender && <span style={{fontSize: '12px', color: 'red'}}>Campo obligatorio</span>}
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
                        placeholder='Télefono o celular'
                        />
                        {errors.address && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="email"
                        {...register('email', {required: true})}
                        placeholder='Email'
                        />
                        {errors.address && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('socialWorkId', { required: true })}>
                            <option value="">Obra social</option>
                            {
                                socialsWorks.map((x) => {
                                    return(
                                        <option value={x.id} key={x.id}>{x.name}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.socialWorkId && <span style={{fontSize: '12px', color: 'red'}}>Campo obligatorio</span>}
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
                :
                <span>¡Error! Para crear un paciente se necesitan obras sociales.</span>
            }
        </section>
    )
}

export default Patient
