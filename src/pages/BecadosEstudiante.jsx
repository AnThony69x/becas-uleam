import React, { useEffect, useState } from "react";
import "../style/BecadosEstudiante.modele.css";
import { Helmet } from "react-helmet";
import logoUleam from "../assets/logoUleam.png";
import persona from "../assets/persona.png"; // Imagen predeterminada

const BecadosEstudiante = () => {
    const [becados, setBecados] = useState([]);
    const [rechazados, setRechazados] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

    useEffect(() => {
        const datosBecados = JSON.parse(localStorage.getItem("becados")) || [];
        const datosRechazados = JSON.parse(localStorage.getItem("rechazados")) || [];
        setBecados(datosBecados);
        setRechazados(datosRechazados);
    }, []);

    const manejarCerrarSesion = () => {
        localStorage.removeItem("usuario");
        window.location.replace("/inicio-sesion");
    };

    const manejarBusqueda = (e) => {
        const textoBusqueda = e.target.value.toLowerCase();
        setBusqueda(e.target.value);

        // Filtrar por nombre, apellido o cédula
        const filtrarLista = (lista, estado) =>
            lista
                .filter((persona) => {
                    const nombreCompleto = `${persona.nombre} ${persona.apellido}`.toLowerCase();
                    return (
                        nombreCompleto.includes(textoBusqueda) ||
                        (persona.cedula && persona.cedula.toLowerCase().includes(textoBusqueda))
                    );
                })
                .map((persona) => ({ ...persona, estado })); // Agregar estado (Becado o Rechazado)

        const resultadosBecados = filtrarLista(becados, "Becado");
        const resultadosRechazados = filtrarLista(rechazados, "Rechazado");

        setResultadosBusqueda([...resultadosBecados, ...resultadosRechazados]);
    };

    return (
        <>
            <Helmet>
                <title>Becados - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>

            <header className="encabezado-becados-estudiante">
                <div className="cubrir-becados-estudiante"></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className="boton-cerrar-sesion-becados-estudiante">
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-becados-estudiante">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-becados-estudiante">
                <img src={logoUleam} alt="Logo Uleam" className="logo-becados-estudiante" />
            </div>

            <main className="cuerpo-becados-estudiante">
                <div className="menu-becados-estudiante">
                    <h2>Buscada</h2>
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido o cédula..."
                        value={busqueda}
                        onChange={manejarBusqueda}
                        className="buscador-becados-estudiante"
                        style={{ textTransform: "uppercase" }}
                    />
                    {busqueda ? (
                        resultadosBusqueda.length > 0 ? (
                            resultadosBusqueda.map((persona, index) => (
                                <div key={index} className={`persona-texto-becados-estudiante ${persona.estado === "Becado" ? "becado" : persona.estado === "Rechazado" ? "rechazado" : ""}`}>
                                    <div className="detalles-becado">
                                        <p>
                                            <strong>Nombre:</strong> {persona.nombre} {persona.apellido} |{" "}
                                            <strong>Cédula:</strong> {persona.cedula} |{" "}
                                            <strong>Carrera:</strong> {persona.carrera} |{" "}
                                            <strong>Beca:</strong> {persona.beca} |{" "}
                                            <strong>Estado:</strong> {persona.estado}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay resultados que coincidan con la búsqueda.</p>
                        )
                    ) : (
                        <>
                            <section>
                                <h3>Lista de Becados</h3>
                                {becados.length > 0 ? (
                                    becados.map((becado, index) => (
                                        <div key={index} className={`persona-texto-becados-estudiante becado`}>
                                            <img
                                                src={becado.icono || persona} // Verificar si el becado tiene un icono, de lo contrario usar la imagen predeterminada persona.png
                                                alt=""
                                                className="icono-persona-becados-estudiante"
                                            />
                                            <div className="detalles-becado">
                                                <p>
                                                    <strong>Nombre:</strong> {becado.nombre} {becado.apellido} |{" "}
                                                    <strong>Cédula:</strong> {becado.cedula} |{" "}
                                                    <strong>Carrera:</strong> {becado.carrera} |{" "}
                                                    <strong>Beca:</strong> {becado.beca} |{" "}
                                                    <strong>Comentario:</strong> {becado.comentario || 'No hay comentario disponible'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay becados registrados.</p>
                                )}
                            </section>

                            <section>
                                <h3>Lista de Rechazados</h3>
                                {rechazados.length > 0 ? (
                                    rechazados.map((rechazado, index) => (
                                        <div key={index} className={`persona-texto-becados-estudiante rechazado`}>
                                            <img
                                                src={rechazado.icono || persona} // Verificar si el rechazado tiene un icono, de lo contrario usar la imagen predeterminada persona.png
                                                alt=""
                                                className="icono-persona-becados-estudiante"
                                            />
                                            <div className="detalles-becado">
                                                <p>
                                                    <strong>Nombre:</strong> {rechazado.nombre} {rechazado.apellido} |{" "}
                                                    <strong>Cédula:</strong> {rechazado.cedula} |{" "}
                                                    <strong>Carrera:</strong> {rechazado.carrera} |{" "}
                                                    <strong>Comentario:</strong> {rechazado.comentario || 'No hay comentario disponible'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay rechazados registrados.</p>
                                )}
                            </section>
                        </>
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
