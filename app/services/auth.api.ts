import { type Auth, auth } from '~/server/auth';
import { createServerFn } from '@tanstack/start';
import { getWebRequest } from '@tanstack/start-server';
export const getAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { headers } = getWebRequest()!;
  const session = await auth.api.getSession({ headers });
  const authResult: Auth = session
    ? {
        isAuthenticated: true,
        user: session.user,
        session: session.session,
      }
    : { isAuthenticated: false, user: null, session: null };

  return authResult;
});
