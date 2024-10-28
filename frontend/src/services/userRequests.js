

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