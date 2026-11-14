import { Pagina } from '../types/pagina';
import { Ponto, PontoRequest } from '../types/ponto';
import { del, get, post, put } from './api';

export function listarPontos(): Promise<Ponto[]> {
  return get<Ponto[]>('/pontos');
}

export function buscarPagina(filtro: string, pagina: number): Promise<Pagina<Ponto>> {
  return get<Pagina<Ponto>>('/pontos/filtro?filtro=' + encodeURIComponent(filtro) + '&page=' + pagina + '&size=10');
}

export function buscarPonto(id: string): Promise<Ponto> {
  return get<Ponto>('/pontos/' + id);
}

export function cadastrarPonto(ponto: PontoRequest): Promise<Ponto> {
  return post<Ponto>('/pontos', ponto);
}

export function editarPonto(id: string, ponto: PontoRequest): Promise<Ponto> {
  return put<Ponto>('/pontos/' + id, ponto);
}

export function excluirPonto(id: string): Promise<void> {
  return del('/pontos/' + id);
}
