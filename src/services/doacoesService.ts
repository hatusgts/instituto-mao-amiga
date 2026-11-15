import { Doacao, DoacaoRequest } from '../types/doacao';
import { Pagina } from '../types/pagina';
import { del, get, post, put } from './api';

export function buscarPagina(filtro: string, pagina: number): Promise<Pagina<Doacao>> {
  return get<Pagina<Doacao>>('/doacoes/filtro?filtro=' + encodeURIComponent(filtro) + '&page=' + pagina + '&size=10');
}

export function buscarDoacao(id: string): Promise<Doacao> {
  return get<Doacao>('/doacoes/' + id);
}

export function cadastrarDoacao(doacao: DoacaoRequest): Promise<Doacao> {
  return post<Doacao>('/doacoes', doacao);
}

export function editarDoacao(id: string, doacao: DoacaoRequest): Promise<Doacao> {
  return put<Doacao>('/doacoes/' + id, doacao);
}

export function excluirDoacao(id: string): Promise<void> {
  return del('/doacoes/' + id);
}
