import React from 'react'
import { BrowserRouter, Route, Routes as ReactRoutes, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/Home'
import Patients from '../pages/Patients/Patients'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ProtectedRoute from '../components/protectedRoute/protectedRoute'
import SocialsWorks from '../pages/SocialsWorks/SocialsWorks'
import Professionals from '../pages/Professionals/Professionals'
import Specialities from '../pages/Specialities/Specialities'
import WorkSchedules from '../pages/workSchedules/WorkSchedules'
import SocialWork from '../pages/Crud/Create/SocialWork'
import Speciality from '../pages/Crud/Create/Speciality'
import Professional from '../pages/Crud/Create/Professional'
import Patient from '../pages/Crud/Create/Patient'




const Routes: React.FC = () => {
    return (
        <BrowserRouter>

            <Layout>

                <ReactRoutes>
                    
                    <Route path="/" element={<Navigate to="/inicio" replace />} />

                    <Route path='/inicio' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    }
                    />

                    <Route path='/profesionales' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Professionals/>
                        </ProtectedRoute>
                    } />

                    <Route path='/profesionales/crear' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Professional/> 
                        </ProtectedRoute>
                    } />

                    <Route path='/profesionales/editar/:id' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />

                    <Route path='/pacientes' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Patients/>
                        </ProtectedRoute>
                    } />

                    <Route path='/pacientes/crear' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Patient/>
                        </ProtectedRoute>
                    } />

                    <Route path='/pacientes/editar/:id' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />


                    <Route path='/turnos' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />
                    <Route path='/turnos/crear' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />

                    <Route path='/turnos/editar/:id' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />

                    <Route path='/obras_sociales' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <SocialsWorks/>
                        </ProtectedRoute>
                    } />

                    <Route path='/obras_sociales/crear' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <SocialWork/>
                        </ProtectedRoute>
                    } />

                    <Route path='/obras_sociales/editar/:id' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />

                    <Route path='/especialidades' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Specialities/>
                        </ProtectedRoute>
                    } />

                    <Route path='/especialidades/crear' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Speciality/>
                        </ProtectedRoute>
                    } />

                    <Route path='/especialidades/editar/:id' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />

                    <Route path='/horarios' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <WorkSchedules/>
                        </ProtectedRoute>
                    } />

                    <Route path='/horarios/crear' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />

                    <Route path='/horarios/editar/:id' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />

                    <Route path='/configuraciones' element={
                        <ProtectedRoute redirectTo='/cuenta/inicio-de-sesion'>
                            <Home/>
                        </ProtectedRoute>
                    } />

                    <Route path='cuenta'>
                        <Route index element={<Navigate to="inicio-de-sesion" replace />} />
                        <Route path="inicio-de-sesion" element={<Login />}/>
                        <Route path="registro" element={<Register />} />
                    </Route>

                </ReactRoutes>

            </Layout>

        </BrowserRouter>
    )
}

export default Routes
