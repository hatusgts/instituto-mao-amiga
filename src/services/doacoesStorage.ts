import AsyncStorage from '@react-native-async-storage/async-storage';
import { Doacao } from '../types/doacao';

const CHAVE_DOACOES = '@instituto_mao_amiga:doacoes_v2';

export async function listarDoacoes(): Promise<Doacao[]> {
  const salvo = await AsyncStorage.getItem(CHAVE_DOACOES);
  return salvo ? (JSON.parse(salvo) as Doacao[]) : [];
}

async function salvarTodas(doacoes: Doacao[]) {
  await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoes));
}

export async function adicionarDoacao(doacao: Doacao) {
  const doacoes = await listarDoacoes();
  await salvarTodas([...doacoes, doacao]);
}

export async function atualizarDoacao(doacaoAtualizada: Doacao) {
  const doacoes = await listarDoacoes();
  await salvarTodas(doacoes.map((d) => (d.id === doacaoAtualizada.id ? doacaoAtualizada : d)));
}

export async function excluirDoacao(id: number) {
  const doacoes = await listarDoacoes();
  await salvarTodas(doacoes.filter((d) => d.id !== id));
}
