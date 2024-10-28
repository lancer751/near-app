import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { username, password } = await request.json();

  // Aquí haces la autenticación con la API de tu backend
  const response = await fetch('http://localhost:3000/api/v1/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data =  await response.json()
    return new Response(JSON.stringify(data), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { token } = await response.json();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `authToken=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`, // Cookie de 1 hora
    },
  });
};
