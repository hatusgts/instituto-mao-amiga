import { useCallback, useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ItemDoacao } from '../components/ItemDoacao';
import { listarDoacoes } from '../services/doacoesStorage';
import { listarPontos } from '../services/pontosService';
import { Doacao } from '../types/doacao';
import { RootStackParamList } from '../types/navegacao';
import { Ponto } from '../types/ponto';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Doacoes'>;

type Total = {
  quantidade: number;
  contagem: number;
};

export function TelaListaDoacoes({ navigation }: Props) {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      listarDoacoes().then((lista) => setDoacoes(lista));
    }, [])
  );

  useEffect(() => {
    listarPontos()
      .then((lista) => setPontos(lista))
      .catch(() => setPontos([]));
  }, []);

  function nomeDoPonto(id: number) {
    const ponto = pontos.find((p) => p.id === id);
    return ponto ? ponto.nome : 'Ponto ' + id;
  }

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

  const doacoesFiltradas = busca.trim()
    ? doacoes.filter((d) => d.tipoItem.toLowerCase().includes(busca.toLowerCase()))
    : doacoes;

  const totaisPorTipo = doacoes.reduce<Record<string, Total>>((acc, d) => {
    if (!acc[d.tipoItem]) acc[d.tipoItem] = { quantidade: 0, contagem: 0 };
    acc[d.tipoItem].quantidade += d.quantidade;
    acc[d.tipoItem].contagem += 1;
    return acc;
  }, {});

  const resumo = Object.entries(totaisPorTipo)
    .map(([tipo, t]) => ({ tipo, ...t }))
    .sort((a, b) => b.quantidade - a.quantidade);

  return (
    <KeyboardAvoidingView
      style={[styles.scroll, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.titulo}>Minhas Doações</Text>
      {resumo.map((item) => (
        <Text key={item.tipo} style={styles.campo}>
          {item.tipo}: {item.quantidade} unidades em {item.contagem} doações
        </Text>
      ))}
      <TextInput
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por tipo de item"
      />
      {doacoesFiltradas.length === 0 ? (
        <Text style={styles.campo}>Nenhuma doação encontrada para "{busca}".</Text>
      ) : (
        <FlatList
          data={doacoesFiltradas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ItemDoacao
              doacao={item}
              nomePonto={nomeDoPonto(item.pontoDestino)}
              onPress={() => navigation.navigate('DetalheDoacao', { doacao: item })}
            />
          )}
        />
      )}
    </KeyboardAvoidingView>
  );
}
