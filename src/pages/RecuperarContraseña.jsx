import React, { useState } from 'react';
import '../style/RecuperarContraseña.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';

const esCorreoValido = (correo) => {
    const patronCorreo = /^e[0-9]{10}@live\.uleam\.edu\.ec$/;
    return patronCorreo.test(correo);
};

const RecuperarContraseña = () => {
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (esCorreoValido(correo)) {
            setMensaje('Correo enviado exitosamente. Por favor, revisa tu bandeja de entrada.');
            setTipoMensaje('success');
            setCorreo(''); 
        } else {
            setMensaje('El correo ingresado no es válido. Debe ser del formato eXXXXXXXXXX@live.uleam.edu.ec');
            setTipoMensaje('error');
        }

        setTimeout(() => {
            setMensaje('');
            setTipoMensaje('');
        }, 5000);
    };

    return (
        <>
            <Helmet>
                <title>Recuperar Contraseña - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>

            <header className="encabezado-recuperar-contraseña">
                <div className="cubrir-recuperar-contraseña"></div>
                <h1>Becas y Ayudas Económicas</h1>
            </header>

            <div className="logo-contenedor-recuperar-contraseña">
                <img src={logoUleam} alt="Logo Uleam" className="logo-recuperar-contraseña" />
            </div>

            <main className="cuerpo-recuperar-contraseña">
                <div className="recuperar-contraseña-form">
                    <form id="formulario-recuperar-contraseña" onSubmit={handleSubmit}>
                        <p>Recuperar Contraseña</p>
                        <label htmlFor="correo">Correo electrónico:</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                        <button type="submit" className="button-recuperar-contraseña">Enviar</button>
                        {mensaje && (
                            <p className={`mensaje ${tipoMensaje}`}>{mensaje}</p>
                        )}
                    </form>
                </div>
            </main>

            <footer className="footer-recuperar-contraseña">
                <div className="creado-recuperar-contraseña">
                    <p>
                        <a
                            href="https://github.com/AnThony69x"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="enlace-recuperar-contraseña"
                        >
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default RecuperarContraseña;
