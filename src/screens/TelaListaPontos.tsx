import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PontoItem } from '../components/PontoItem';
import { listarPontos } from '../services/pontosService';
import { RootStackParamList } from '../types/navegacao';
import { Ponto } from '../types/ponto';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;

export function TelaListaPontos({ navigation }: Props) {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  function carregar() {
    setCarregando(true);
    setErro(false);
    listarPontos()
      .then((lista) => setPontos(lista))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <View style={[styles.scroll, styles.container]}>
      <Text style={styles.titulo}>Pontos de Coleta e Distribuição</Text>
      <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.botaoSecundarioTexto}>Cadastrar doação</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.navigate('Doacoes')}>
        <Text style={styles.botaoSecundarioTexto}>Ver Minhas Doações</Text>
      </TouchableOpacity>

      {carregando ? <Text style={styles.campo}>Carregando pontos...</Text> : null}

      {erro ? (
        <View>
          <Text style={styles.erro}>Não foi possível carregar os pontos. Verifique se a API está ligada.</Text>
          <TouchableOpacity style={styles.botao} onPress={carregar}>
            <Text style={styles.botaoTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!carregando && !erro ? (
        <FlatList
          data={pontos}
          keyExtractor={(ponto) => String(ponto.id)}
          renderItem={({ item }) => (
            <PontoItem
              ponto={item}
              onPress={() => navigation.navigate('Detalhe', { id: item.id })}
            />
          )}
        />
      ) : null}
    </View>
  );
}
