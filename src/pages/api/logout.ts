// src/pages/logout.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      // Sobrescribe la cookie con expiración en el pasado
      'Set-Cookie':
        'spotify_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict',
      Location: '/', // Redirige al inicio
    },
  });
};
