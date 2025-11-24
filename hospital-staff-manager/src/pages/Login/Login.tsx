import React, { useRef, useState } from 'react'
import './login.css'
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { ILoginData, IUser } from '../../utils/interfaceFormRegister_Login/interface';
import { loginUser } from '../../fetch/fetchUser';
import Swal from 'sweetalert2';
import { useRedirect } from '../../components/hooks/useRedirect';
import { useAppDispatch } from '../../redux/hooks';
import { setCurrentUser } from '../../redux/user/userSlice';




const Login: React.FC = () => {

    const form = useRef<HTMLFormElement>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ILoginData>();

    const dispatch = useAppDispatch();

    useRedirect('/inicio')

    const onSubmit: SubmitHandler<ILoginData> = async (data) => {

        try {

            setLoading(true)

            const user: IUser = await loginUser(data)

            if (user) {
                dispatch(setCurrentUser({
                    ...user
                }))
            }

            if (!user) {
                Swal.fire({
                    title: "¡Email o contraseña incorrecta!",
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
        <section className='container-login'>
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <div className='container-login-title'>
                    <h2>Iniciar sesión</h2>
                </div>
                <div className='container-login-input'>
                    <input
                    type="email"
                    {...register('email', {required: true})}
                    placeholder='Email'
                    />
                    {errors.email && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-login-input'>
                    <input
                    type="password"
                    {...register('password', {required: true})}
                    placeholder='Contraseña'
                    />
                    {errors.password && <span style={{fontSize: '12px', color: 'red', width: '80%'}}>Campo obligatorio</span>}
                </div>
                <div className='container-login-button'>
                    {
                        loading ?
                        <button className='loading-login-form' disabled={true}>
                            <div className='spinner-login-form'/>
                        </button>
                        :
                        <button>Entrar</button>
                    }
                </div>
            </form>
        </section>
    )
}

export default Login
