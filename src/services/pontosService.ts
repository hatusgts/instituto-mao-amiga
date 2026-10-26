import { Pagina } from '../types/pagina';
import { Ponto } from '../types/ponto';
import { getJSON } from './api';

export async function listarPontos(): Promise<Ponto[]> {
  const pagina = await getJSON<Pagina<Ponto>>('/pontos?size=50&sort=nome');
  return pagina.content;
}

export function buscarPonto(id: number): Promise<Ponto> {
  return getJSON<Ponto>('/pontos/' + id);
}
