import React from 'react'
import './patients.css'
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from '../../redux/hooks';



const Patients: React.FC = () => {

    const currentUser = useAppSelector(state => state.user.currentUser)

    return (
        <section className='container-patients'>
            <div>
                <h3>Pacientes</h3>
            </div>
            <form action="">
                <div>
                    <input type="text" name="search" placeholder='Nombre, apellido o DNI…'/>
                </div>
                <div>
                    <option value="">

                    </option>
                </div>
                <div>
                    <option value="">

                    </option>
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
