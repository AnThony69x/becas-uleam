import React, { useState } from 'react';
import '../style/IncioSesion.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';
import { validarInicioSesion } from '../components/validarInicioSesion';

const InicioSesion = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarSubmit = async (event) => {
        event.preventDefault();

        const resultado = await validarInicioSesion(usuario, contraseña);

        if (resultado.startsWith('/')) {
            window.location.href = resultado;
        } else {
            setMensaje(resultado);
        }
    };

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>

            <header className='encabezado-incio-sesion'>
                <div className='cubrir-incio-sesion'></div>
                <h1>Becas y Ayudas Económicas</h1>
            </header>

            <div className='logo-contenedor-incio-sesion'>
                <img src={logoUleam} alt="Logo" className="logo-incio-sesion" />
            </div>

            <main className='cuerpo-inicio-sesion'>
                <form className='form-incio-sesion' onSubmit={manejarSubmit}>
                    <div className="formulario-incio-sesion">
                        <label htmlFor="usuario">Usuario:</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>

                    <div className="formulario-incio-sesion">
                        <label htmlFor="contraseña">Contraseña:</label>
                        <input
                            type="password"
                            id="contraseña"
                            name="contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            required
                        />
                    </div>

                    <div className="botton-incio-sesion">
                        <button type="submit" className="button-incio-sesion">Ingresar</button>
                    </div>

                    {mensaje && <div id="mensaje" style={{ color: 'red' }}>{mensaje}</div>}

                    <p className="recuperar-contraseña-incio-sesion">
                        <a href="/recuperar-contraseña">¿Olvidaste tu contraseña?</a>
                    </p>
                </form>
            </main>

            <footer className="footer-incio-sesion">
                <div className="creado-incio-sesion">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-incio-sesion">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default InicioSesion;
