import React, { useEffect, useState } from 'react';
import '../style/ComunicacionEstudiante.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';
import campana from '../assets/campana.png';

const ComunicacionEstudiante = () => {
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const usuarioId = usuario ? usuario.id : null;
        const postulaciones = JSON.parse(localStorage.getItem('postulacionesEstudiantes')) || [];
    
        if (typeof usuarioId === 'number') {
            const postulacion = postulaciones.find(p => p.id === usuarioId);
    
            if (postulacion) {
                if (postulacion.estado === 'aprobar') {
                    setMensaje(`¡Felicidades ${postulacion.nombre}! Tu postulación para la beca "${postulacion.beca}" ha sido aceptada. Comentario: ${postulacion.comentario}`);
                } else if (postulacion.estado === 'rechazar') {
                    setMensaje(`Hola ${postulacion.nombre}, lamentamos informarte que tu postulación para la beca "${postulacion.beca}" ha sido rechazada. Comentario: ${postulacion.comentario}`);
                } else {
                    setMensaje('Tu postulación aún está en revisión.');
                }
            } else {
                setMensaje('No se encontró información sobre tu postulación.');
            }
        } else {
            setMensaje('No estás registrado o no hay postulaciones disponibles.');
        }
    }, []);

    const manejarCerrarSesion = () => {
        localStorage.removeItem('usuario');
        window.location.replace('/inicio-sesion');
    };

    return (
        <>
            <Helmet>
                <title>Comunicación - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>

            <header className='encabezado-comunicacion-estudiante'>
                <div className='cubrir-comunicacion-estudiante'></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className='boton-cerrar-sesion-comunicacion-estudiante'>
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-comunicacion-estudiante">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-comunicacion-estudiante">
                <img src={logoUleam} alt="Logo Uleam" className="logo-comunicacion-estudiante" />
            </div>

            <main className='cuerpo-comunicacion-estudiante'>
                <div className='menu-comunicacion-estudiante'>
                    <div className='campana-comunicacion-estudiante'>
                        <img src={campana} alt="Campana" className="icono-campana-comunicacion-estudiante" />
                    </div>
                    <p>{mensaje}</p>
                </div>
            </main>

            <footer className="footer-comunicacion-estudiante">
                <div className="creado-comunicacion-estudiante">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-comunicacion-estudiante">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default ComunicacionEstudiante;