import { Doacao } from './doacao';
import { Ponto } from './ponto';

export type RootStackParamList = {
  Lista: undefined;
  MeusPontos: undefined;
  Detalhe: { id: string };
  FormularioPonto: { ponto?: Ponto } | undefined;
  Cadastro: { doacao?: Doacao } | undefined;
  Doacoes: undefined;
  DetalheDoacao: { id: string };
};
