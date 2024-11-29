import React, { useEffect, useState }from "react";
import '../style/BecadosEstudiante.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';
import persona from '../assets/persona.png';

const BecadosEstudiante = () => {
    const [becados, setBecados] = useState([]);

    useEffect(() => {
        const datosBecados = JSON.parse(localStorage.getItem('becados')) || [];
        setBecados(datosBecados);
    }, []);

    const manejarCerrarSesion = () => {
        localStorage.removeItem('usuario');
        window.location.replace('/inicio-sesion');
    };

    return (
        <>
            <Helmet>
                <title>Rechazados - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>
        
            <header className='encabezado-becados-estudiante'>
                <div className='cubrir-becados-estudiante'></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className='boton-cerrar-sesion-becados-estudiante'>
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-becados-estudiante">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-becados-estudiante">
                <img src={logoUleam} alt="Logo Uleam" className="logo-becados-estudiante" />
            </div>

            <main className="cuerpo-becados-administrador">
                <div className="menu-becados-administrador">
                    <h2>Becados</h2>
                    {becados.length > 0 ? (
                        becados.map((becado, index) => (
                            <div key={index} className="persona-texto-becados-administrador">
                                <img src={persona} alt="Persona" className="icono-persona-becados-administrador" />
                                <div className="detalles-becado">
                                    <p><strong>Nombre:</strong> {becado.nombre} | <strong>Carrera:</strong> {becado.carrera} | <strong>Beca:</strong> {becado.beca}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay becados registrados.</p>
                    )}
                </div>
            </main>

            <footer className="footer-becados-estudiante">
                <div className="creado-becados-estudiante">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-becados-estudiante">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>            
        </>
    );
};

export default BecadosEstudiante;