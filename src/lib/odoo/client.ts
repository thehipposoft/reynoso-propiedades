import 'server-only';
import xmlrpc from 'xmlrpc';

const HTTPS_PORT = 443;
const PROTOCOL_PATTERN = /^https?:\/\//i;

const requireEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
};

// Acepta la URL con o sin protocolo ("reynoso.odoo.com" o "https://reynoso.odoo.com").
const parseHostname = (raw: string): string => {
  const withProtocol = PROTOCOL_PATTERN.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).hostname;
  } catch {
    throw new Error(`ODOO_URL inválida: "${raw}"`);
  }
};

type OdooConfig = {
  db: string;
  username: string;
  apiKey: string;
  commonClient: xmlrpc.Client;
  objectClient: xmlrpc.Client;
};

// Inicialización diferida: el build no falla al importar el módulo.
let config: OdooConfig | null = null;

const getConfig = (): OdooConfig => {
  if (config) return config;

  const host = parseHostname(requireEnv('ODOO_URL'));
  config = {
    db: requireEnv('ODOO_DB'),
    username: requireEnv('ODOO_USERNAME'),
    apiKey: requireEnv('ODOO_API_KEY'),
    commonClient: xmlrpc.createSecureClient({ host, port: HTTPS_PORT, path: '/xmlrpc/2/common' }),
    objectClient: xmlrpc.createSecureClient({ host, port: HTTPS_PORT, path: '/xmlrpc/2/object' }),
  };
  return config;
};

let cachedUid: number | null = null;

function authenticate(): Promise<number> {
  if (cachedUid) return Promise.resolve(cachedUid);

  const { commonClient, db, username, apiKey } = getConfig();

  return new Promise((resolve, reject) => {
    commonClient.methodCall(
      'authenticate',
      [db, username, apiKey, {}],
      (err, uid) => {
        if (err) return reject(err);
        cachedUid = uid as number;
        resolve(uid as number);
      }
    );
  });
}

export async function odooExecute<T = any>(
  model: string,
  method: string,
  args: any[] = [],
  kwargs: Record<string, any> = {}
): Promise<T> {
  const uid = await authenticate();
  const { objectClient, db, apiKey } = getConfig();

  return new Promise((resolve, reject) => {
    objectClient.methodCall(
      'execute_kw',
      [db, uid, apiKey, model, method, args, kwargs],
      (err, result) => (err ? reject(err) : resolve(result as T))
    );
  });
}