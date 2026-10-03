import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_DOACOES = '@instituto_mao_amiga:doacoes';

export async function excluirDoacao(id: number) {
  const salvo = await AsyncStorage.getItem(CHAVE_DOACOES);
  const doacoes = salvo ? JSON.parse(salvo) : [];
  const novo = doacoes.filter((doacao: any) => doacao.id !== id);
  await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(novo));
}
