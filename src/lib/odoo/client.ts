import 'server-only';
import xmlrpc from 'xmlrpc';

const ODOO_URL = process.env.ODOO_URL!;
const ODOO_DB = process.env.ODOO_DB!;
const ODOO_USERNAME = process.env.ODOO_USERNAME!;
const ODOO_API_KEY = process.env.ODOO_API_KEY!;

const { hostname } = new URL(ODOO_URL);

const commonClient = xmlrpc.createSecureClient({
  host: hostname,
  port: 443,
  path: '/xmlrpc/2/common',
});

const objectClient = xmlrpc.createSecureClient({
  host: hostname,
  port: 443,
  path: '/xmlrpc/2/object',
});

let cachedUid: number | null = null;

function authenticate(): Promise<number> {
  if (cachedUid) return Promise.resolve(cachedUid);

  return new Promise((resolve, reject) => {
    commonClient.methodCall(
      'authenticate',
      [ODOO_DB, ODOO_USERNAME, ODOO_API_KEY, {}],
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

  return new Promise((resolve, reject) => {
    objectClient.methodCall(
      'execute_kw',
      [ODOO_DB, uid, ODOO_API_KEY, model, method, args, kwargs],
      (err, result) => (err ? reject(err) : resolve(result as T))
    );
  });
}