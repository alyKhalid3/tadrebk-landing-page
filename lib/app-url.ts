/**
 * Base URL of the main Tadreebak app (sign-up, login, internships).
 * Override at build time with NEXT_PUBLIC_APP_URL when the main app moves.
 */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tadrebk.vercel.app';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? APP_URL;

export const appLink = (path: string) => `${APP_URL}${path}`;
