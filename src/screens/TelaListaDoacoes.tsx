import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pontosMock } from '../data/pontos';
import { styles } from '../styles/styles';

const CHAVE_DOACOES = '@instituto_mao_amiga:doacoes';

export function TelaListaDoacoes() {
  const [doacoes, setDoacoes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(CHAVE_DOACOES).then((salvo) => {
        if (salvo) setDoacoes(JSON.parse(salvo));
      });
    }, [])
  );

  return (
    <View style={[styles.scroll, styles.container]}>
      <Text style={styles.titulo}>Doações Cadastradas</Text>
      <FlatList
        data={doacoes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const ponto = pontosMock.find((p) => p.id === item.pontoId);
          return (
            <View style={styles.itemLista}>
              <Text style={styles.itemNome}>{item.tipo} - {item.quantidade}</Text>
              <Text style={styles.campo}>Destino: {ponto ? ponto.nome : 'Ponto não encontrado'}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
