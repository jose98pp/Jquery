/*descripcion : formulario de registro de estudiantes
desarrolador :Jose Carlos Peña 
fecha:2024-04-23
Cambios: ninguno*/

$(document).ready(function() {
    // Array para almacenar los estudiantes registrados
    var estudiantes = [];

    // Función para agregar un estudiante al array y a la tabla
    $('#registroEstudianteForm').submit(function(event) {
        event.preventDefault();

        // Obtener los datos del formulario
        let ci = $('#ci').val();
        let nombre = $('#nombre').val();
        let fecha = $('#fecha').val();
        let direccion = $('#direccion').val();

        // Crear un objeto con los datos del estudiante
        let estudiante = {
            ci: ci,
            nombre: nombre,
            fecha: fecha,
            direccion: direccion
        };

        // Agregar el estudiante al array
        estudiantes.push(estudiante);

        // Agregar el estudiante a la tabla
        $('#tablaEstudiantesBody').append(`
            <tr>
                <td>${estudiante.ci}</td>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.fecha}</td>
                <td>${estudiante.direccion}</td>
            </tr>
        `);

        // Limpiar el formulario
        $('#registroEstudianteForm')[0].reset();
    });

    function exportarExcel() {
        const estudiantes = [];
        $('#tablaEstudiantesBody tr').each(function() {
            const ci = $(this).find('td:eq(0)').text();
            const nombre = $(this).find('td:eq(1)').text();
            const fecha = $(this).find('td:eq(2)').text();
            const direccion = $(this).find('td:eq(3)').text();
            estudiantes.push({ ci, nombre, fecha, direccion });
        });
    
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(estudiantes);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'datos.xlsx');
    }
    
    
    

    // Función para exportar los datos a JSON
    function exportarJSON() {
        // Convertir el array de estudiantes a formato JSON
        const estudiantesJSON = JSON.stringify(estudiantes);
        
        // Crear un objeto Blob con el contenido JSON
        const blob = new Blob([estudiantesJSON], { type: 'application/json' });

        // Crear un enlace para descargar el archivo JSON
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'estudiantes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Evento de clic para exportar a Excel
    $('#exportarExcel').click(function() {
        exportarExcel();
    });

    // Evento de clic para exportar a JSON
    $('#exportarJSON').click(function() {
        exportarJSON();
    });
});
