import React, { useState, useEffect } from 'react';
import '../style/PostulacionAdministrador.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';

const AdministradorPostulaciones = () => {
    const [postulaciones, setPostulaciones] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const postulacionesGuardadas = JSON.parse(localStorage.getItem('postulacionesEstudiantes')) || [];
        setPostulaciones(postulacionesGuardadas);
    }, []);

    const manejarAccion = (id, accion, comentario) => {
        const postulacionActualizada = postulaciones.find((postulacion) => postulacion.id === id);
        const nuevasPostulaciones = postulaciones.filter((postulacion) => postulacion.id !== id);

        const postulacionConEstado = {
            ...postulacionActualizada,
            estado: accion,
            comentario: comentario || 'Sin comentario',
        };

        // Coloca la postulación actualizada al inicio
        nuevasPostulaciones.unshift(postulacionConEstado);
        setPostulaciones(nuevasPostulaciones);
        localStorage.setItem('postulacionesEstudiantes', JSON.stringify(nuevasPostulaciones));

        // Actualiza "rechazados" o "becados"
        if (accion === 'rechazar') {
            const rechazados = JSON.parse(localStorage.getItem('rechazados')) || [];
            rechazados.unshift(postulacionConEstado);
            localStorage.setItem('rechazados', JSON.stringify(rechazados));
        } else if (accion === 'aprobar') {
            const becados = JSON.parse(localStorage.getItem('becados')) || [];
            becados.unshift(postulacionConEstado);
            localStorage.setItem('becados', JSON.stringify(becados));
        }

        // Mostrar mensaje de confirmación
        const mensajeAccion = accion === 'aprobar' ? 'Postulación aprobada' : 'Postulación rechazada';
        setMensaje(`${mensajeAccion}. Comentario: ${comentario}`);
        setTimeout(() => setMensaje(''), 3000);
    };

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

            <header className='encabezado-postulacion-administrador'>
                <div className='cubrir-postulacion-administrador'></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className='boton-cerrar-sesion-postulacion-administrador'>
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-postulacion-administrador">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-postulacion-administrador">
                <img src={logoUleam} alt="Logo Uleam" className="logo-postulacion-administrador" />
            </div>

            <main className='cuerpo-posculacion-administrador'>
                <div className="menu-postulacion-administrador">
                    {mensaje && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {postulaciones.length > 0 ? (
                            postulaciones.map((postulacion, index) => (
                                <li key={postulacion.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                                    <p><strong>Nombre:</strong> {postulacion.nombre} {postulacion.apellido}</p>
                                    <p><strong>Cédula:</strong> {postulacion.cedula}</p>
                                    <p><strong>Fecha de Nacimiento:</strong> {postulacion.fechaNacimiento}</p>
                                    <p><strong>Periodo Académico:</strong> {postulacion.periodo}</p>
                                    <p><strong>Beca:</strong> {postulacion.beca}</p>
                                    <p><strong>Carrera:</strong> {postulacion.carrera}</p>
                                    <p><strong>Colegio Graduado:</strong> {postulacion.colegioGraduado}</p>
                                    <p><strong>Nota de Grado:</strong> {postulacion.notaGrado}</p>
                                    <p><strong>Nota de Disciplina:</strong> {postulacion.notaDisciplina}</p>
                                    <p><strong>Promedio:</strong> {postulacion.promedioDosPeriodosAnteriores}</p>
                                    <p><strong>Postulación a Beca:</strong> {postulacion.postulacionABeca}</p>
                                    <p><strong>Tipo de Becas Tenido:</strong> {postulacion.tipoBecasTenido}</p>
                                    <p><strong>Por qué postula:</strong> {postulacion.porquePostulaBeca}</p>

                                    {postulacion.estado && <p><strong>Estado:</strong> {postulacion.estado}</p>}
                                    {postulacion.comentario && <p><strong>Comentario:</strong> {postulacion.comentario}</p>}

                                    {!postulacion.estado && (
                                        <div>
                                            <textarea
                                                placeholder="Comentario (opcional)"
                                                style={{ width: '100%', marginBottom: '10px' }}
                                                onChange={(e) => {
                                                    const nuevasPostulaciones = [...postulaciones];
                                                    nuevasPostulaciones[index] = {
                                                        ...nuevasPostulaciones[index],
                                                        comentarioTemporal: e.target.value,
                                                    };
                                                    setPostulaciones(nuevasPostulaciones);
                                                }}
                                            ></textarea>
                                            <button
                                                style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
                                                onClick={() =>
                                                    manejarAccion(
                                                        postulacion.id,
                                                        'aprobar',
                                                        postulacion.comentarioTemporal || 'Sin comentario'
                                                    )
                                                }
                                            >
                                                Aprobar
                                            </button>
                                            <button
                                                style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
                                                onClick={() =>
                                                    manejarAccion(
                                                        postulacion.id,
                                                        'rechazar',
                                                        postulacion.comentarioTemporal || 'Sin comentario'
                                                    )
                                                }
                                            >
                                                Rechazar
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>No hay postulaciones disponibles.</p>
                        )}
                    </ul>
                </div>
            </main>
            <footer className="footer-postulacion-administrador">
                <div className="creado-postulacion-administrador">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-postulacion-administrador">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default AdministradorPostulaciones;
