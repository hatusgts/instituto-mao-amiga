import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@instituto_mao_amiga:pontos_favoritos';

export async function listarFavoritos(): Promise<string[]> {
  const salvo = await AsyncStorage.getItem(CHAVE_FAVORITOS);
  return salvo ? (JSON.parse(salvo) as string[]) : [];
}

export async function alternarFavorito(id: string): Promise<string[]> {
  const favoritos = await listarFavoritos();
  const novos = favoritos.includes(id) ? favoritos.filter((favorito) => favorito !== id) : [...favoritos, id];
  await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novos));
  return novos;
}
