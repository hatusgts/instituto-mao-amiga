import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PontoItem } from '../components/PontoItem';
import { ErroApi } from '../services/api';
import { alternarFavorito, listarFavoritos } from '../services/favoritosStorage';
import { buscarPonto } from '../services/pontosService';
import { RootStackParamList } from '../types/navegacao';
import { Ponto } from '../types/ponto';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'MeusPontos'>;

async function buscarOuNulo(id: string): Promise<Ponto | null> {
  try {
    return await buscarPonto(id);
  } catch (e) {
    if (e instanceof ErroApi && e.status === 404) {
      return null;
    }
    throw e;
  }
}

export function TelaMeusPontos({ navigation }: Props) {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  async function carregar() {
    setErro(false);
    try {
      const ids = await listarFavoritos();
      const encontrados = await Promise.all(ids.map(buscarOuNulo));
      setPontos(encontrados.filter((ponto): ponto is Ponto => ponto !== null));
    } catch {
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  function desmarcar(id: string) {
    setPontos((atual) => atual.filter((ponto) => ponto.id !== id));
    alternarFavorito(id);
  }

  return (
    <View style={[styles.scroll, styles.container]}>
      <Text style={styles.titulo}>Meus Pontos</Text>

      {carregando ? (
        <View style={styles.lista}>
          <ActivityIndicator size="large" color="#1B3A5C" />
          <Text style={styles.campo}>Carregando favoritos...</Text>
        </View>
      ) : null}

      {!carregando && erro ? (
        <View style={styles.lista}>
          <Text style={styles.erro}>Não foi possível carregar os favoritos. Verifique se a API está ligada.</Text>
          <TouchableOpacity style={styles.botao} onPress={carregar}>
            <Text style={styles.botaoTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!carregando && !erro ? (
        <FlatList
          style={styles.lista}
          data={pontos}
          keyExtractor={(ponto) => ponto.id}
          ListEmptyComponent={
            <Text style={styles.campo}>Você ainda não favoritou nenhum ponto. Toque no ♡ na lista de pontos.</Text>
          }
          ListHeaderComponent={pontos.length > 0 ? <Text style={styles.campo}>Toque no ♥ para desmarcar.</Text> : null}
          renderItem={({ item }) => (
            <PontoItem
              ponto={item}
              favorito
              onPress={() => navigation.navigate('Detalhe', { id: item.id })}
              onFavoritar={() => desmarcar(item.id)}
            />
          )}
        />
      ) : null}
    </View>
  );
}
