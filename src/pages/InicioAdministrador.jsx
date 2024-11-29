import React from 'react';
import '../style/InicioAdministrador.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';
import { useNavigate } from 'react-router-dom';


const InicioAdministrador = () => {
    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
        localStorage.removeItem('usuario');
        window.location.replace('/inicio-sesion');
    };

    return (
        <>
            <Helmet>
                <title>Administrador - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>
            <header className='encabezado-inicio-administrador'>
                <div className='cubrir-inicio-administrador'></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className='boton-cerrar-sesion-inicio-administrador'>
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-inicio-administrador">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-inicio-administrador">
                <img src={logoUleam} alt="Logo Uleam" className="logo-inicio-administrador" />
            </div>

            <main className="cuerpo-inicio-administrador">
                <div className="menu-inicio-administrador">
                    <p>Menú Principal</p>
                    <div className="becas-menu-inicio-administrador">
                        <button onClick={() => navigate('/postulacion-administrador')}>Postulación</button>
                        <button onClick={() => navigate('/rechazados-administrador')}>Rechazados</button>
                        <button onClick={() => navigate('/becados-administrador')}>Becados</button>
                    </div>
                </div>
            </main>

            <footer className="footer-inicio-administrador">
                <div className="creado-inicio-administrador">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-inicio-administrador">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default InicioAdministrador;