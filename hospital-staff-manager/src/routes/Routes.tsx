import React from 'react'
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/Home'




const Routes: React.FC = () => {
    return (
        <BrowserRouter>

            <Layout>

                <ReactRoutes>
                    
                    <Route path='/' element={<Home/>} />

                </ReactRoutes>

            </Layout>

        </BrowserRouter>
    )
}

export default Routes
