const URL_API = 'http://192.168.0.55:8080';

export class ErroApi extends Error {
  status: number;

  constructor(status: number) {
    super('Erro ' + status + ' na API');
    this.status = status;
  }
}

export async function getJSON<T>(caminho: string): Promise<T> {
  const resposta = await fetch(URL_API + caminho);
  if (!resposta.ok) {
    throw new ErroApi(resposta.status);
  }
  return (await resposta.json()) as T;
}
