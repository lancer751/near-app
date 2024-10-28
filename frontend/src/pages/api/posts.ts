import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies }) => {
    const authToken = cookies.get('authToken');
    console.log(authToken)
    if (!authToken) {
        return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        });
    }

    const response = await fetch('https://tu-api-externa.com/posts', {
        headers: {
        'Authorization': `Bearer ${authToken}`
        }
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};
