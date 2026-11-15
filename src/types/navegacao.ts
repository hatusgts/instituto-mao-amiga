import { Doacao } from './doacao';
import { Ponto } from './ponto';

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { id: string };
  FormularioPonto: { ponto?: Ponto } | undefined;
  Cadastro: undefined;
  Doacoes: undefined;
  DetalheDoacao: { doacao: Doacao };
};
