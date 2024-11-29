// gestionarFormularioPostulacion.js
export function gestionarFormularioPostulacion() {
    document.addEventListener('DOMContentLoaded', function() {
        const postulacionBecaSelect = document.getElementById('postulacionABeca');
        const tipoBecasContainer = document.getElementById('tipoBecasTenidoContainer');
        const fechaElaboracionInput = document.getElementById('fechaElaboracion');

        // Asegurarse de que los elementos existen antes de usarlos
        if (postulacionBecaSelect && tipoBecasContainer && fechaElaboracionInput) {
            
            // Establecer la fecha actual en el campo de fecha de elaboración
            const today = new Date().toISOString().split('T')[0];
            fechaElaboracionInput.setAttribute('min', today);

            // Mostrar u ocultar el contenedor de tipo de becas si ha postulado previamente
            postulacionBecaSelect.addEventListener('change', function() {
                tipoBecasContainer.style.display = postulacionBecaSelect.value === 'si' ? 'block' : 'none';
            });

            // Inicializar visibilidad del contenedor de tipo de becas
            tipoBecasContainer.style.display = postulacionBecaSelect.value === 'si' ? 'block' : 'none';
        }
    });
}
