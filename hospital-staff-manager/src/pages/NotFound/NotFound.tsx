import React from 'react'
import './notfound.css'
import { useNavigate } from 'react-router-dom'




const NotFound: React.FC = () => {
    
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-card">
                <div className="monitor-screen">
                    <svg viewBox="0 0 500 150" className="ecg-line">
                        <path d="M0,75 L50,75 L60,45 L70,105 L80,75 L120,75 L130,25 L140,125 L150,75 L200,75 L210,55 L220,95 L230,75 L350,75" 
                            fill="none" stroke="#2563EB" strokeWidth="4" className="pulse" />
                        <path d="M350,75 L500,75" 
                            fill="none" stroke="#94A3B8" strokeWidth="4" strokeDasharray="10,10" />
                    </svg>
                    <div className="error-code">
                        404
                    </div>
                </div>
                <h1 className="error-title">Diagnóstico: Página no encontrada</h1>
                <p className="error-message">La ruta que intentas consultar no existe en el sistema clínico o ha sido dada de baja.</p>
                <div className="action-buttons">
                    <button onClick={() => navigate(-1)} className="btn btn-secondary">← Volver atrás</button>
                    <button onClick={() => navigate('/')} className="btn btn-primary">Ir al Dashboard</button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
