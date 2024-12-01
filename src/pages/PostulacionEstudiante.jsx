import React, { useState, useEffect } from 'react';
import '../style/PostulacionEstudiante.modele.css';
import { Helmet } from 'react-helmet';
import logoUleam from '../assets/logoUleam.png';
import { gestionarFormularioPostulacion } from '../components/gestionarFormularioPostulacion';

const PostulacionEstudiante = () => {
    const [formData, setFormData] = useState({
        periodo: '',
        beca: '',
        fechaNacimiento: '',
        nombre: '',
        apellido: '',
        cedula: '', // Nuevo campo
        carrera: '',
        colegioGraduado: '',
        notaGrado: '',
        notaDisciplina: '',
        promedioDosPeriodosAnteriores: '',
        postulacionABeca: '',
        tipoBecasTenido: '',
        porquePostulaBeca: '',
    });

    const [esMayorDeEdad, setEsMayorDeEdad] = useState(true);
    const [mensajeEdad, setMensajeEdad] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        gestionarFormularioPostulacion();
    }, []);

    const manejarCerrarSesion = () => {
        localStorage.removeItem('usuario');
        window.location.replace('/inicio-sesion');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'fechaNacimiento') {
            validarMayorDeEdad(value);
        }
    };

    const validarMayorDeEdad = (fecha) => {
        if (!fecha) {
            setEsMayorDeEdad(false);
            setMensajeEdad('Debes ser mayor de edad para postular.');
            return;
        }

        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaSeleccionada.getFullYear();
        const mes = hoy.getMonth() - fechaSeleccionada.getMonth();
        const dia = hoy.getDate() - fechaSeleccionada.getDate();

        if (mes < 0 || (mes === 0 && dia < 0)) {
            edad--;
        }

        if (edad >= 18) {
            setEsMayorDeEdad(true);
            setMensajeEdad('');
        } else {
            setEsMayorDeEdad(false);
            setMensajeEdad('Debes ser mayor de edad para postular.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Obtener postulaciones guardadas
        const postulacionesGuardadas = JSON.parse(localStorage.getItem('postulacionesEstudiantes')) || [];

        // Verificar duplicados
        const existeDuplicado = postulacionesGuardadas.some(postulacion => 
            postulacion.nombre.toLowerCase() === formData.nombre.toLowerCase() &&
            postulacion.apellido.toLowerCase() === formData.apellido.toLowerCase() &&
            postulacion.cedula === formData.cedula
        );

        if (existeDuplicado) {
            setMensaje('Error: Ya existe una postulación con este nombre, apellido y cédula.');
            setTimeout(() => setMensaje(''), 5000);
            return;
        }

        // Agregar nueva postulación
        const postulacionEstudiante = { id: Date.now(), ...formData };
        postulacionesGuardadas.push(postulacionEstudiante);
        localStorage.setItem('postulacionesEstudiantes', JSON.stringify(postulacionesGuardadas));

        setMensaje('¡La postulación ha sido enviada exitosamente!');
        setFormData({
            periodo: '',
            beca: '',
            fechaNacimiento: '',
            nombre: '',
            apellido: '',
            cedula: '',
            carrera: '',
            colegioGraduado: '',
            notaGrado: '',
            notaDisciplina: '',
            promedioDosPeriodosAnteriores: '',
            postulacionABeca: '',
            tipoBecasTenido: '',
            porquePostulaBeca: '',
        });
        setTimeout(() => setMensaje(''), 9000);
    };

    return (
        <>
            <Helmet>
                <title>Postulación - Becas y Ayudas Económicas</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>

            <header className='encabezado-postulacion-estudiante'>
                <div className='cubrir-postulacion-estudiante'></div>
                <h1>Becas y Ayudas Económicas</h1>
                <div className="boton-cerrar-sesion-postulacion-estudiante">
                    <button onClick={manejarCerrarSesion} className="button-cerrar-sesion-postulacion-estudiante">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="logo-contenedor-postulacion-estudiante">
                <img src={logoUleam} alt="Logo Uleam" className="logo-postulacion-estudiante" />
            </div>

            <main className='cuerpo-postulacion-estudiante'>
                <div className="menu-postulacion-estudiante">
                    <p>Formulario de Postulación</p>
                    <div className="formulario-postulacion-estudiante">
                        <form id="form-postulacion-estudiante" onSubmit={handleSubmit}>
                            <label htmlFor="periodo-postulacion-estudiante">Periodo*:</label>
                            <select id="periodo-postulacion-estudiante" name="periodo" value={formData.periodo} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                <option value="2024-2">2024-2</option>
                            </select>

                            <label htmlFor="beca-postulacion-estudiante">Beca o Ayuda Económica*:</label>
                            <select id="beca-postulacion-estudiante" name="beca" value={formData.beca} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                <option value="beca-socio-economica">Becas por situación socioeconómica</option>
                                <option value="beca-discapacidad">Becas para estudiantes con discapacidad</option>
                                <option value="beca-alto-rendimiento">Becas por alto rendimiento académico</option>
                                <option value="ayuda-afirmativas">Ayuda por acciones afirmativas</option>
                                <option value="ayuda-posgrado">Ayuda para movilidad académica (Posgrado)</option>
                                <option value="ayuda-seminarios">Ayuda para asistir a seminarios y/o cursos de capacitación</option>
                            </select>

                            <label htmlFor="fecha-nacimiento-postulacion-estudiante">Fecha de Nacimiento*:</label>
                            <input 
                                type="date" 
                                id="fecha-nacimiento-postulacion-estudiante" 
                                name="fechaNacimiento" 
                                value={formData.fechaNacimiento} 
                                onChange={handleChange} 
                                required
                                title="Debes ser mayor de edad"
                            />
                            {!esMayorDeEdad && <p className="mensaje-error">{mensajeEdad}</p>}

                            <label htmlFor="nombre-postulacion-estudiante">Nombres*:</label>
                            <input 
                                type="text" 
                                id="nombre-postulacion-estudiante" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleChange} 
                                required 
                                pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+" 
                                title="Solo se permiten letras, espacios y caracteres especiales como ñ y acentos" 
                            />

                            <label htmlFor="apellido-postulacion-estudiante">Apellidos*:</label>
                            <input 
                                type="text" 
                                id="apellido-postulacion-estudiante" 
                                name="apellido" 
                                value={formData.apellido} 
                                onChange={handleChange} 
                                required 
                                pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+" 
                                title="Solo se permiten letras, espacios y caracteres especiales como ñ y acentos" 
                            />

                            <label htmlFor="cedula-postulacion-estudiante">Cédula*:</label>
                            <input 
                                type="text" 
                                id="cedula-postulacion-estudiante" 
                                name="cedula" 
                                value={formData.cedula} 
                                onChange={handleChange} 
                                required 
                                pattern="\d{10}" 
                                title="La cédula debe contener exactamente 10 dígitos numéricos." 
                            />


                            <label htmlFor="carrera-postulacion-estudiante">Carrera de cual postula*:</label>
                            <input
                            type="text"
                            id="carrera-postulacion-estudiante" 
                            name="carrera" 
                            value={formData.carrera}
                            onChange={handleChange}
                            required 
                            pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+"
                            title="Solo se permiten letras, espacios y caracteres especiales como ñ y acentos" 
                            />

                            <label htmlFor="colegio-graduado-postulacion-estudiante">Colegio del cual se graduó*:</label>
                            <input 
                                type="text" 
                                id="colegio-graduado-postulacion-estudiante" 
                                name="colegioGraduado" 
                                value={formData.colegioGraduado} 
                                onChange={handleChange} 
                                required 
                                pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+" 
                                title="Solo se permiten letras, espacios y caracteres especiales como ñ y acentos" 
                            />

                            <label htmlFor="nota-grado-postulacion-estudiante">Nota de Grado*:</label>
                            <input 
                                type="number" 
                                id="nota-grado-postulacion-estudiante" 
                                name="notaGrado" 
                                value={formData.notaGrado} 
                                onChange={handleChange} 
                                required
                                step="0.01"  
                                min="0" 
                                max="20" 
                                title="Ingrese un valor entre 0 y 20" 
                            />

                            <label htmlFor="nota-disciplina-postulacion-estudiante">Nota de Disciplina*:</label>
                            <input 
                                type="number" 
                                id="nota-disciplina-postulacion-estudiante" 
                                name="notaDisciplina" 
                                value={formData.notaDisciplina} 
                                onChange={handleChange} 
                                required 
                                step="0.01"
                                min="0" 
                                max="20" 
                                title="Ingrese un valor entre 0 y 20" 
                            />

                            <label htmlFor="promedio-dos-periodos-anteriores-postulacion-estudiante">Promedio de los dos periodos anteriores*:</label>
                            <input 
                                type="number" 
                                id="promedio-dos-periodos-anteriores-postulacion-estudiante" 
                                name="promedioDosPeriodosAnteriores" 
                                value={formData.promedioDosPeriodosAnteriores} 
                                onChange={handleChange} 
                                required 
                                step="0.01"
                                min="0" 
                                max="20" 
                                title="Ingrese un valor entre 0 y 20" 
                            />

                            <label htmlFor="postulacion-a-beca-postulacion-estudiante">¿Ha postulado anteriormente a alguna beca?*</label>
                            <select 
                                id="postulacion-a-beca-postulacion-estudiante" 
                                name="postulacionABeca" 
                                value={formData.postulacionABeca} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="si">Sí</option>
                                <option value="no">No</option>
                            </select>

                            {formData.postulacionABeca === 'si' && (
                                <div id="tipo-becas-container-postulacion-estudiante">
                                    <label htmlFor="tipo-becas-tenido-postulacion-estudiante">¿Qué tipo de becas ha tenido anteriormente?*</label> 
                                    <input
                                    type="text" 
                                    id="tipo-becas-tenido-postulacion-estudiante" 
                                    name="tipoBecasTenido" 
                                    value={formData.tipoBecasTenido} 
                                    onChange={handleChange} 
                                />
                                </div>
                            )}

                            <label htmlFor="porque-postulo-beca-postulacion-estudiante">¿Por qué está postulando a la Beca?*</label>
                            <textarea 
                                id="porque-postulo-beca-postulacion-estudiante" 
                                name="porquePostulaBeca" 
                                value={formData.porquePostulaBeca} 
                                onChange={handleChange} 
                                required
                            ></textarea>

                            <button 
                                type="submit" 
                                disabled={!esMayorDeEdad}
                                title={!esMayorDeEdad ? 'Debes ser mayor de edad para enviar la postulación' : ''}
                            >
                                    Enviar Postulación
                            </button>
                            <button type="reset" onClick={() => setFormData({
                                periodo: '',
                                beca: '',
                                fechaNacimiento: '',
                                nombre: '',
                                apellido: '',
                                cedula: '',
                                carrera: '',
                                colegioGraduado: '',
                                notaGrado: '',
                                notaDisciplina: '',
                                promedioDosPeriodosAnteriores: '',
                                postulacionABeca: '',
                                tipoBecasTenido: '',
                                porquePostulaBeca: ''
                            })}>Restablecer</button>
                        </form>
                        
                        {mensaje && <p className="mensaje-confirmacion">{mensaje}</p>}                    
                    </div>
                </div>
            </main>
            <footer className="footer-postulacion-estudiante">
                <div className="creado-postulacion-estudiante">
                    <p>
                        <a href="https://github.com/AnThony69x" target="_blank" rel="noopener noreferrer" className="enlace-postulacion-estudiante">
                            Hecho por Anthony Mejia
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
};

export default PostulacionEstudiante;