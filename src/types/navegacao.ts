import { Doacao } from './doacao';

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { id: number };
  Cadastro: { doacaoParaEditar?: Doacao } | undefined;
  Doacoes: undefined;
  DetalheDoacao: { doacao: Doacao };
};
