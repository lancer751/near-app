
export async function loginAuthentication({username, password}){

    console.log(password)
    //Realizando la solicitud POST al backend
    try{
        const payload = new URLSearchParams();
        payload.append('user[username]', username)
        payload.append('user[password]', password)

        const response = await fetch('http://localhost:3000/api/v1/auth',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // "Content-Type": "application/x-www-form-urlencoded"
            },
            // body: payload.toString(),
            body: JSON.stringify({username, password}),
        });

        if(response.ok){
            const data = await response.json()
            window.localStorage.setItem('neartoken', data.token); //store the token in localstorage
            return {
                message: "Login exitoso",
                authenticated: true
            }
        }

        const data = await response.json()
        return {
            message: data.error,
            authenticated: false
        }

    }catch(e){
        console.error("Error en la solicitud", e)
        return {
            message: "Ocurrio un error en la request",
            authenticated: false
        }
    }

}

export function verifyUserAuthetication() {
    const token = window.localStorage.getItem('neartoken')

    if(!token) {
        console.log('No hay token de acceso, se debe iniciar sesion para renovarlo u obtenerlo'); 
        return false
    }

    window.location.href = "/"
    return true
}