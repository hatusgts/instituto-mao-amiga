const URL_API = 'http://192.168.0.55:8080/api/v1';

export class ErroApi extends Error {
  status: number;

  constructor(status: number) {
    super('Erro ' + status + ' na API');
    this.status = status;
  }
}

async function requisitar(metodo: string, caminho: string, corpo?: unknown): Promise<Response> {
  const resposta = await fetch(URL_API + caminho, {
    method: metodo,
    headers: corpo === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  });
  if (!resposta.ok) {
    throw new ErroApi(resposta.status);
  }
  return resposta;
}

export async function get<T>(caminho: string): Promise<T> {
  const resposta = await requisitar('GET', caminho);
  return (await resposta.json()) as T;
}

export async function post<T>(caminho: string, corpo: unknown): Promise<T> {
  const resposta = await requisitar('POST', caminho, corpo);
  return (await resposta.json()) as T;
}

export async function put<T>(caminho: string, corpo: unknown): Promise<T> {
  const resposta = await requisitar('PUT', caminho, corpo);
  return (await resposta.json()) as T;
}

export async function del(caminho: string): Promise<void> {
  await requisitar('DELETE', caminho);
}
