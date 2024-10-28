export function dateConvertion(dateToConvert){

    const date = new Date(dateToConvert)

    // Opciones de formateo para la fecha
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC', // Puedes cambiar a 'America/New_York', etc., según tu zona horaria
    };

    // Formatear la fecha
    const formattedDate = date.toLocaleString('es-ES', options);

    return formattedDate
}