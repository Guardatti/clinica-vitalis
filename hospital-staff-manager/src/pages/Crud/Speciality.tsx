import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../redux/hooks';
import Swal from 'sweetalert2';
import './crud.css'
import { useNavigate, useParams } from 'react-router-dom';
import { createSpeciality, getSpecialityById, updateSpeciality } from '../../fetch/fetchSpecialities';
import type { ISpeciality } from '../../utils/speciality';




const Speciality: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const { id } = useParams();

    const {register, handleSubmit, formState: {errors}, reset} = useForm<ISpeciality>()

    const [loading, setLoading] = useState<boolean>(false)

    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async (data: ISpeciality) => {

        try {
            
            setLoading(true)

            if (!id) {

                const newSpeciality = await createSpeciality(currentUser, data)
            
                if (newSpeciality) {
                    Swal.fire({
                        title: "¡Especialidad creada!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/especialidades')

                }

                reset();
            }

            if (id) {

                const saveChanges = await updateSpeciality(currentUser, data, id)

                if (saveChanges) {
                    Swal.fire({
                        title: "¡Especialidad actualizada!",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/especialidades')

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

                    const data = await getSpecialityById(currentUser, id);
                    
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
        <section className='container-create'>´
            {
                loadingForm ?
                <div className='container-spinner-create-form'>
                    <div className='spinner-form'/>
                </div>
                :
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className='container-create-title'>
                        {
                            id ?
                            <h2>Editar especialidad</h2>
                            :
                            <h2>Crear especialidad</h2>
                        }
                    </div>
                    <div className='container-create-input'>
                        <input
                        type="text"
                        {...register('name', {required: true})}
                        placeholder='Nombre'
                        />
                        {errors.name && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                    </div>
                    {
                        id &&
                        <div className='container-create-input'>
                            <select {...register('state', { required: true })}>
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

export default Speciality
