import React from 'react';
import '../style/InicioEstudiante.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';
import { useNavigate } from 'react-router-dom';

const InicioEstudiante = () => {
    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
        localStorage.removeItem('usuario');
        window.location.replace('/inicio-sesion');
    };

    return (
        <>
            <Helmet>
                <title>Inicio - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>

            <header className='encabezado-inicio-estudiante'>
                <div className='cubrir-inicio-estudiante'></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className='boton-cerrar-sesion-inicio-estudiante'>
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-inicio-estudiante">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-inicio-estudiante">
                <img src={logoUleam} alt="Logo Uleam" className="logo-inicio-estudiante" />
            </div>

            <main className="cuerpo-inicio-estudiante">
                <div className="menu-inicio-estudiante">
                    <p>Menú Principal</p>
                    <div className="becas-menu-inicio-estudiante">
                        <button onClick={() => window.location.href = 'https://departamentos.uleam.edu.ec/bienestar/becas/'}>
                            Becas
                        </button>
                        <button onClick={() => navigate('/postulacion-estudiante')}>Postulación</button>
                        <button onClick={() => navigate('/comunicacion-estudiante')}>Comunicaciones</button>
                        <button onClick={() => navigate('/becados-estudiante')}>Becados</button>
                    </div>
                </div>
            </main>

            <footer className="footer-inicio-estudiante">
                <div className="creado-inicio-estudiante">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-inicio-estudiante">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default InicioEstudiante;
