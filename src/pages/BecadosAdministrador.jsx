import React, { useEffect, useState } from 'react';
import '../style/BecadosAdministrador.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';
import persona from '../assets/persona.png';

const BecadosAdministrador = () => {
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
                <title>Becados - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>

            <header className='encabezado-becados-administrador'>
                <div className='cubrir-becados-administrador'></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className='boton-cerrar-sesion-becados-administrador'>
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-becados-administrador">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-becados-administrador">
                <img src={logoUleam} alt="Logo Uleam" className="logo-becados-administrador" />
            </div>

            <main className="cuerpo-becados-administrador">
                <div className="menu-becados-administrador">
                    <h2>Becados</h2>
                    {becados.length > 0 ? (
                        becados.map((becado, index) => (
                            <div key={index} className="persona-texto-becados-administrador">
                                <img src={persona} alt="Persona" className="icono-persona-becados-administrador" />
                                <div className="detalles-becado">
                                    <p><strong>Nombre:</strong> {becado.nombre} {becado.apellido} | <strong>Carrera:</strong> {becado.carrera}
                                    | <strong>Periodo:</strong> {becado.periodo} | <strong>Nota: {becado.promedioDosPeriodosAnteriores}</strong> </p>
                                    <p><strong>Beca aplicada:</strong> {becado.beca}</p>
                                    <p><strong>Comentario:</strong> {becado.comentario || 'Sin comentario'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay becados registrados.</p>
                    )}
                </div>
            </main>

            <footer className="footer-becados-administrador">
                <div className="creado-becados-administrador">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-becados-administrador">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default BecadosAdministrador;
