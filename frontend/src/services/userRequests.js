

export async function getUserById(id){
    const res = await fetch(`http://localhost:3000/api/v1/users/${id}`)

    if(!res.ok){
        return {message: 'No se pudo obtener informacion del usuario'}
    }

    const userData = await res.json()

    return userData
}


export async function getAllUsersNear() {
    try{
        const res = await fetch('http://localhost:3000/api/v1/users')
        const usersNear = await res.json()
        return usersNear

    }catch(error){
        console.error(error)
    }

    return {message: 'Error al obtener los usuarios'}
}


export async function updateUserInformation(userId, formData) {
    const api = `http://localhost:3000/api/v1/users/${userId}`;
  
    // Configura el cuerpo de la solicitud con los datos del formulario
    const requestBody = JSON.stringify({
      username: formData.username,
      password: formData.password,
      profile_image_url: formData.profile_image_url,
      email: formData.email,
      role: formData.role
    });
  
    try {
      const response = await fetch(api, {
        method: 'PUT', // Método HTTP para actualizar
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }
  
      const result = await response.json();
      console.log('Usuario actualizado:', result);
      return {message: "Se logro actuliazar el usuario", status: 1}

    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      return {message: "Error al actualiar el usuario", status: 0}

    }
  }