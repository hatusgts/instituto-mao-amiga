import { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ItemDoacao } from '../components/ItemDoacao';
import { styles } from '../styles/styles';

const CHAVE_DOACOES = '@instituto_mao_amiga:doacoes';

export function TelaListaDoacoes({ navigation }: any) {
  const [doacoes, setDoacoes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(CHAVE_DOACOES).then((salvo) => {
        if (salvo) setDoacoes(JSON.parse(salvo));
      });
    }, [])
  );

  if (doacoes.length === 0) {
    return (
      <View style={[styles.scroll, styles.container]}>
        <Text style={styles.titulo}>Minhas Doações</Text>
        <Text style={styles.campo}>Nenhuma doação cadastrada ainda.</Text>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.botaoTexto}>Cadastrar doação</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.scroll, styles.container]}>
      <Text style={styles.titulo}>Minhas Doações</Text>
      <FlatList
        data={doacoes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ItemDoacao doacao={item} />}
      />
    </View>
  );
}
