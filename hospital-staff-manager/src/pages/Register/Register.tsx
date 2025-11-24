import React, { useRef, useState } from 'react'
import './register.css'
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { IRegisterData, IUser } from '../../utils/interfaceFormRegister_Login/interface';
import { createUser } from '../../fetch/fetchUser';
import Swal from 'sweetalert2';
import { useRedirect } from '../../components/hooks/useRedirect';



const Register: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegisterData>();
    
    useRedirect('/inicio')

    const onSubmit: SubmitHandler<IRegisterData> = async (data) => {

        try {

            setLoading(true)

            const user: IUser = await createUser(data)

            if (user) {
                Swal.fire({
                    title: "¡Usuario registrado!",
                    icon: "success",
                    draggable: true
                });
            }

            if (!user) {
                Swal.fire({
                    title: "¡Email ya existente!",
                    icon: "error",
                    draggable: true
                });
            }

            reset();

        } catch (error) {

            console.log(error);

        } finally {
            setLoading(false)
        }

    }

    return (
        <section className='container-register'>
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <div className='container-register-title'>
                    <h2>Únete a Vitalis</h2>
                </div>
                <div className='container-register-input'>
                    <input
                    type="text"
                    {...register('name', {required: true})}
                    placeholder='Nombre'
                    />
                    {errors.name && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-register-input'>
                    <input
                    type="text"
                    {...register('surname', {required: true})}
                    placeholder='Apellido'
                    />
                    {errors.surname && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-register-input'>
                    <input
                    type="email"
                    {...register('email', {required: true})}
                    placeholder='Email'
                    />
                    {errors.email && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-register-input'>
                    <input
                    type="password"
                    {...register('password', {required: true})}
                    placeholder='Contraseña'
                    />
                    {errors.password && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-register-button'>
                    {
                        loading ?
                        <button className='loading-register-form' disabled={true}>
                            <div className='spinner-register-form'/>
                        </button>
                        :
                        <button>Registrarse</button>
                    }
                </div>
            </form>
        </section>
    )
}

export default Register
