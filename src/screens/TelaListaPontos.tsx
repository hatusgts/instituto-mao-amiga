import { FlatList, Text, View } from 'react-native';
import { PontoItem } from '../components/PontoItem';
import { pontosMock } from '../data/pontos';
import { styles } from '../styles/styles';

export function TelaListaPontos({ navigation }: any) {
  return (
    <View style={[styles.scroll, styles.container]}>
      <Text style={styles.titulo}>Pontos de Coleta e Distribuição</Text>
      <FlatList
        data={pontosMock}
        keyExtractor={(ponto) => ponto.id}
        renderItem={({ item }) => (
          <PontoItem
            ponto={item}
            onPress={() => navigation.navigate('Detalhe', { id: item.id })}
          />
        )}
      />
    </View>
  );
}
