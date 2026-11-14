import { Doacao } from './doacao';

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { id: string };
  Cadastro: { doacaoParaEditar?: Doacao } | undefined;
  Doacoes: undefined;
  DetalheDoacao: { doacao: Doacao };
};
