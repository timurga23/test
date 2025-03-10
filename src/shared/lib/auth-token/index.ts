import { TOKEN_COOKIE_NAME, TOKEN_EXPIRES_DAYS } from './constant';

export function saveAuthToken(token: string): void {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + TOKEN_EXPIRES_DAYS);
  document.cookie = `${TOKEN_COOKIE_NAME}=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

/**
 * Получает токен из cookies
 */
export function getAuthToken(): string | null {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith(`${TOKEN_COOKIE_NAME}=`));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
}

/**
 * Удаляет токен из cookies
 */
export function removeAuthToken(): void {
  document.cookie = `${TOKEN_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
