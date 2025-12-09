import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../redux/hooks';
import Swal from 'sweetalert2';
import './create.css'
import { useNavigate } from 'react-router-dom';
import type { IProfessional } from '../../../utils/professionals';
import { createProfessional } from '../../../fetch/fetchProfessionals';
import { getSpecialities } from '../../../fetch/fetchSpecialities';
import type { ISpeciality } from '../../../utils/speciality';




const Professional: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IProfessional>()

    const [specialities, setSpecialities] = useState<ISpeciality[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async (data: IProfessional) => {

        try {
            
            setLoading(true)

            const newProfessional = await createProfessional(currentUser, data)
            
            if (newProfessional) {
                Swal.fire({
                    title: "¡Profesional creado!",
                    icon: "success",
                    draggable: true
                });

                navigate('/profesionales')

            }

            reset();

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(( ) => {

        const findSpecialities = async (): Promise<void> => {

            try {

                setLoadingForm(true)

                await new Promise(resolve => setTimeout(resolve, 1000)); 
                
                const response: ISpeciality[] = await getSpecialities(currentUser);

                setSpecialities(response)

            } catch (error) {
                console.log(error);
            } finally {
                setLoadingForm(false)
            }

        }

        findSpecialities();

    }, [currentUser])

    return (
        <section className='container-create'>
            {
                loadingForm ?
                <div className='container-spinner-create-form'>
                    <div className='spinner-form'/>
                </div>
                :
                specialities.length > 0 ?
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className='container-create-title'>
                        <h2>Crear profesional</h2>
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
                        placeholder='Teléfono o celular'
                        />
                        {errors.phone && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="email"
                        {...register('email', {required: true})}
                        placeholder='Email'
                        />
                        {errors.email && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('specialityID', { required: true })}>
                            <option value="">Especialidad</option>
                            {
                                specialities.map((x) => {
                                    return(
                                        <option value={x.id} key={x.id}>{x.name}</option>
                                    )
                                })
                            }
                        </select>
                        {errors.specialityID && <span style={{fontSize: '12px', color: 'red'}}>Campo obligatorio</span>}
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
                <span>¡Error! Para crear un profesional se necesitan especialidades.</span>
            }
        </section>
    )
}

export default Professional
