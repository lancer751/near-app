export function decodeToken(token) {
    // Dividir el token en partes
    const parts = token.split('.');

    // Verificar que el token tenga tres partes
    if (parts.length !== 3) {
        throw new Error('Token no es válido');
    }

    // La segunda parte es el payload
    const payload = parts[1];

    // Decodificar el payload desde Base64URL
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    // Parsear el JSON para obtener el objeto
    const jsonPayload = JSON.parse(decodedPayload);

    return jsonPayload;
}


