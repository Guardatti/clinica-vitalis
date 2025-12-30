import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../redux/hooks';
import Swal from 'sweetalert2';
import './crud.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { IProfessional } from '../../utils/professionals';
import { createProfessional, getProfessionalById, updateProfessional } from '../../fetch/fetchProfessionals';
import { getSpecialities } from '../../fetch/fetchSpecialities';
import type { ISpeciality } from '../../utils/speciality';




const Professional: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const { id } = useParams();

    const location = useLocation();

    const isRead = location.pathname.includes('consultar')

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IProfessional>()

    const [specialities, setSpecialities] = useState<ISpeciality[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async (data: IProfessional) => {

        try {
            
            setLoading(true)

            if (!id) {

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

            }

            if (id) {

                const saveChanges = await updateProfessional(currentUser, data, id)

                if (saveChanges) {
                    Swal.fire({
                        title: "¡Profesional actualizado!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/profesionales')

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

                const dataSpeciality = await getSpecialities(currentUser)

                setSpecialities(dataSpeciality)

                if (id) {

                    const data = await getProfessionalById(currentUser, id)

                    reset({
                        ...data,
                        birthdate: data.birthdate?.split('T')[0]
                    })

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
                specialities.length > 0 ?
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className='container-create-title'>
                        {
                            isRead ?
                            <h2>Consulta de profesional</h2>
                            :
                            id ?
                            <h2>Editar profesional</h2>
                            : 
                            <h3>Crear profesional</h3>
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
                        {...register('surname', {required: true})}
                        placeholder='Apellido'
                        disabled={isRead}
                        />
                        {errors.surname && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="text"
                        {...register('dni', {required: true})}
                        placeholder='DNI'
                        disabled={isRead}
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
                        disabled={isRead}
                        />
                        {errors.birthdate && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('gender', { required: true })} disabled={isRead}>
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
                        type="email"
                        {...register('email', {required: true})}
                        placeholder='Email'
                        disabled={isRead}
                        />
                        {errors.email && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    <div className='container-create-input'>
                        <select {...register('specialityID', { required: true })} disabled={isRead}>
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
                    {
                        id &&
                        <div className='container-create-input'>
                            <select {...register('state', { required: true })} disabled={isRead}>
                                <option value="Activo/a">Activo/a</option>
                                <option value="Inactivo/a">Inactivo/a</option>
                                <option value="Licencia">Licencia</option>
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
                :
                <span>¡Error! Para crear o editar un profesional se necesitan especialidades.</span>
            }
        </section>
    )
}

export default Professional
