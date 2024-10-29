export async function getAllRecentPosts(tokenAccess: string | undefined) {
  if (!tokenAccess) {
    console.error("No se encontró el token de acceso");
    return { message: 'No autorizado' };
  }

  try {
    const res = await fetch('http://localhost:3000/api/v1/posts', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenAccess}`
      }
    });

    if (!res.ok) {
      console.error("Error en la respuesta del servidor", res.statusText);
      return { message: 'Error al obtener los posts' };
    }

    const recentPosts = await res.json();
    return recentPosts;

  } catch (error) {
    console.error("Error de red al obtener los posts:", error);
    return { message: 'Error al obtener los posts' };
  }
}

export async function getPostById(id:string | undefined, authToken:string | undefined){
  if(id === undefined || authToken === undefined){
    return {message: 'Token expirado'}
  }

  const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })

  if(!res.ok){
      return {message: 'No se pudo obtener informacion del usuario'}
  }

  const postData = await res.json()

  return postData
}
  
export async function filterPosts(filters, token:string){
  console.log(token)

  const {username, category, tags, title} = filters

  const postsToFilter = await getAllRecentPosts(token)

  
  return postsToFilter.filter(post => {
    return post.author_info.username === username 
  }) 
}