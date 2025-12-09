import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../redux/hooks';
import Swal from 'sweetalert2';
import './create.css'
import { useNavigate } from 'react-router-dom';
import { createSpeciality } from '../../../fetch/fetchSpecialities';
import type { ISpeciality } from '../../../utils/speciality';




const Speciality: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const currentUser = useAppSelector(state => state.user.currentUser)

    const {register, handleSubmit, formState: {errors}, reset} = useForm<ISpeciality>()

    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async (data: ISpeciality) => {

        try {
            
            setLoading(true)

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
                    <h2>Crear especialidad</h2>
                </div>
                <div className='container-create-input'>
                    <input
                    type="text"
                    {...register('name', {required: true})}
                    placeholder='Nombre'
                    />
                    {errors.name && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
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

export default Speciality
