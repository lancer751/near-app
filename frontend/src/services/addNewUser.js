export async function registerNewUser(registerData){
    let data;
    console.log(registerData)

    try{

        const response = fetch('http://localhost:3000/api/v1/users',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData),
        });

        if(!response.ok){
            data = await response.json()
            console.log(data)

            return {
                message: "Usuario no agregado",
                status: false
            }
        }

        data = await response.json()
        return {
            message: "Usuario agregardo",
            status: true
        }

    }catch(e){
        return {
            message: "Usuario agregardo",
            status: false
        }
    }
}