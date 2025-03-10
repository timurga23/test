export type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IRequestHeaders {
  'Content-Type': string;
  Authorization?: string;
}

export interface IRequestOptions {
  method: THttpMethod;
  headers: IRequestHeaders;
  body: string | null;
}

export interface IApiError {
  message: string;
  timestamp: string;
  status: number;
  error: string;
  path: string;
}
