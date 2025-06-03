import type { APIRoute } from 'astro';
import { getAccessToken } from '../../lib/spotify';

export const GET: APIRoute = async ({ url, redirect, cookies }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Código no encontrado.', { status: 400 });
  }

  const token = await getAccessToken(code);

  if (!token) {
    return new Response('No se pudo obtener el token', { status: 500 });
  }

  // Guardar token en cookie
  cookies.set('spotify_token', token, {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    maxAge: 60 * 60 * 1, // 1 hora
  });

  return redirect('/');
};
