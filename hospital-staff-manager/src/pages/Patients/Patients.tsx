import React, { useEffect, useMemo, useRef, useState } from 'react'
import './patients.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';
import { getPatients } from '../../fetch/fetchPatients';
import { useForm } from 'react-hook-form';
import type { IPatient } from '../../utils/patients';


interface FormData {
    search: string;
    gender: string;
    socialWork: string;
}

const Patients: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    const [loading, setLoading] = useState<boolean>(false);

    const [patients, setPatients] = useState<IPatient[]>([])

    const { register, handleSubmit } = useForm<FormData>()

    const genders = useMemo(() => 
        [...new Set(patients.map(g => g.gender))], 
        [patients]
    );

    const socialsWorks = useMemo(() => 
        [...new Set(patients.map(s => s.socialWork))], 
        [patients]
    );

    const form = useRef<HTMLFormElement>(null);

    const onSubmit = async (data: FormData) => {

        try {
            setLoading(true)
            const response: IPatient[] = await getPatients(currentUser, data);
            setPatients(response);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(( ) => {

        const findPatients = async (): Promise<void> => {

            try {

                setLoading(true)
                const response: IPatient[] = await getPatients(currentUser);
                setPatients(response)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }

        }

        findPatients();

    }, [currentUser])

    return (
        <section className='container-patients'>
            <div>
                <h3>Pacientes</h3>
            </div>
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register('search')} type="text" placeholder='Nombre, apellido o DNI…'/>
                </div>
                <div>
                    <select {...register("gender")}>
                        <option value="">Genero</option>
                        {
                            genders.map((x) => {
                                return(
                                    <option value={x} key={x}>{x}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <select {...register("socialWork")} >
                        <option value="">Obra social</option>
                        {
                            socialsWorks.map((x) => {
                                return(
                                    <option value={x} key={x}>{x}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <button><CiSearch /></button>
                </div>
            </form>
            <table>

            </table>
        </section>
    )
}

export default Patients
