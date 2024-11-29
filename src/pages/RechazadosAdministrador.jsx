import React, { useEffect, useState } from 'react';
import '../style/RechazadosAdministrador.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';
import persona from '../assets/persona.png';

const RechazadosAdministrador = () => {
    const [rechazados, setRechazados] = useState([]);

    useEffect(() => {
        const datosRechazados = JSON.parse(localStorage.getItem('rechazados')) || [];
        setRechazados(datosRechazados);
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

            <header className='encabezado-rechazados-administrador'>
                <div className='cubrir-rechazados-administrador'></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className='boton-cerrar-sesion-rechazados-administrador'>
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-rechazados-administrador">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-rechazados-administrador">
                <img src={logoUleam} alt="Logo Uleam" className="logo-rechazados-administrador" />
            </div>

            <main className="cuerpo-rechazados-administrador">
                <div className="menu-rechazados-administrador">
                    <h2>Rechazados</h2>
                    {rechazados.length > 0 ? (
                        rechazados.map((rechazado, index) => (
                            <div key={index} className="persona-texto-rechazados-administrador">
                                <img src={persona} alt="Persona" className="icono-persona-rechazados-administrador" />
                                <div className="detalles-rechazado">
                                    <p><strong>Nombre:</strong> {rechazado.nombre} {rechazado.apellido} | <strong>Carrera:</strong> {rechazado.carrera} 
                                    | <strong>Periodo:</strong> {rechazado.periodo} | <strong>Nota:</strong> {rechazado.promedioDosPeriodosAnteriores}</p> 
                                    <p><strong>Beca aplicada:</strong> {rechazado.beca}</p>
                                    <p><strong>Comentario:</strong> {rechazado.comentario || 'Sin comentario'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay rechazados registrados.</p>
                    )}
                </div>
            </main>

            <footer className="footer-rechazados-administrador">
                <div className="creado-rechazados-administrador">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-rechazados-administrador">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default RechazadosAdministrador;
