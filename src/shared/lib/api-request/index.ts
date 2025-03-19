import { getAuthToken, removeAuthToken } from '../auth-token';

/**
 * Сохраняет токен в cookies
 */

interface IArgs {
  domain?: string;
  endpoint: string;
  method?: string;
  body?: any;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  credentials?: RequestCredentials | null;
  responseType?: 'json' | 'blob' | 'void' | 'unknown';
}

/**
 * Базовая функция для отправки запросов к API
 *
 * @param domain - Базовый URL API (по умолчанию API_BASE_URL)
 * @param endpoint - Конечная точка API (например, '/editor/data')
 * @param method - HTTP метод ('GET', 'POST', 'DELETE' и т.д.)
 * @param body - Данные для отправки (если POST/PUT)
 * @param query - Параметры запроса для URL
 * @param headers - Дополнительные заголовки запроса
 * @param credentials - Настройки передачи учетных данных
 * @param responseType - Тип ожидаемого ответа ('json', 'blob', 'void', 'unknown')
 * @returns Ответ API типа T
 */
export async function apiRequest<T>({
  domain = import.meta.env.VITE_API_BASE_URL,
  endpoint,
  method = 'GET',
  body = null,
  query = {},
  headers: customHeaders = {},
  credentials = null,
  responseType = 'json',
}: Omit<IArgs, 'signal'>): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const queryString = new URLSearchParams(query).toString();
  const url = `${domain}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
    credentials: credentials || undefined,
  };

  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      removeAuthToken();
    }

    if (response.status >= 299) {
      const res = await response.json();
      // @ts-ignore
      throw new Error(res.message);
    }

    if (responseType === 'void') {
      return undefined as T;
    }

    if (responseType === 'blob') {
      return response.blob() as Promise<T>;
    }

    if (responseType === 'unknown') {
      return response as unknown as T;
    }

    const text = await response.text();
    if (!text) {
      return null as T;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
}
