// src/types/xmlrpc.d.ts
declare module 'xmlrpc' {
  export interface ClientOptions {
    host: string;
    port: number;
    path: string;
  }

  export interface Client {
    methodCall(
      method: string,
      params: any[],
      callback: (error: Error | null, value: any) => void
    ): void;
  }

  export function createClient(options: ClientOptions): Client;
  export function createSecureClient(options: ClientOptions): Client;
}