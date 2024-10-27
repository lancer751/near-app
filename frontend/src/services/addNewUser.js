export async function registerNewUser(registerData){
    let data;
    console.log(registerData)
    // const {
    //     username,
    //     password,
    //     email,
    //     name
    // } = registerData

    try{

        const response = fetch('http://localhost:3000/api/v1/users',{
            method: "POST",
            // headers: {
            //     // "Content-Type": "application/json"
            // },
            body: registerData,
        });

        if(response.ok){
            data = await response.json()
            console.log(data)

            return {
                message: "Usuario agregado",
                status: true
            }
        }

        data = await response.json()
        return {
            message: "Usuario no agregardo",
            status: false
        }

    }catch(e){
        return {
            message: "Error al agregar el usuario",
            status: false
        }
    }
}