import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ItemDoacao } from '../components/ItemDoacao';
import { buscarPagina } from '../services/doacoesService';
import { Doacao } from '../types/doacao';
import { RootStackParamList } from '../types/navegacao';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Doacoes'>;

export function TelaListaDoacoes({ navigation }: Props) {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState(false);

  const filtroAtual = useRef('');
  const proximaPagina = useRef(0);
  const totalPaginas = useRef(1);
  const ocupado = useRef(false);
  const primeiroFoco = useRef(true);

  async function carregarPagina(filtro: string, pagina: number) {
    ocupado.current = true;
    try {
      const resposta = await buscarPagina(filtro, pagina);
      if (filtro !== filtroAtual.current) {
        return;
      }
      setDoacoes((atual) => (pagina === 0 ? resposta.content : [...atual, ...resposta.content]));
      totalPaginas.current = resposta.page.totalPages;
      proximaPagina.current = pagina + 1;
    } catch {
      if (filtro === filtroAtual.current) {
        setErro(true);
      }
    } finally {
      if (filtro === filtroAtual.current) {
        ocupado.current = false;
        setCarregando(false);
        setCarregandoMais(false);
      }
    }
  }

  function iniciarBusca(texto: string) {
    filtroAtual.current = texto.trim();
    proximaPagina.current = 0;
    totalPaginas.current = 1;
    setErro(false);
    setCarregando(true);
    setDoacoes([]);
    carregarPagina(filtroAtual.current, 0);
  }

  function carregarMais() {
    if (ocupado.current || proximaPagina.current >= totalPaginas.current) {
      return;
    }
    setCarregandoMais(true);
    carregarPagina(filtroAtual.current, proximaPagina.current);
  }

  useEffect(() => {
    const espera = setTimeout(() => iniciarBusca(busca), 400);
    return () => clearTimeout(espera);
  }, [busca]);

  useFocusEffect(
    useCallback(() => {
      if (primeiroFoco.current) {
        primeiroFoco.current = false;
        return;
      }
      iniciarBusca(filtroAtual.current);
    }, [])
  );

  return (
    <View style={[styles.scroll, styles.container]}>
      <Text style={styles.titulo}>Minhas Doações</Text>
      <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.botaoSecundarioTexto}>Cadastrar doação</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por tipo de item"
      />

      {carregando ? (
        <View style={styles.lista}>
          <ActivityIndicator size="large" color="#1B3A5C" />
          <Text style={styles.campo}>Carregando doações...</Text>
        </View>
      ) : null}

      {!carregando && erro ? (
        <View style={styles.lista}>
          <Text style={styles.erro}>Não foi possível carregar as doações. Verifique se a API está ligada.</Text>
          <TouchableOpacity style={styles.botao} onPress={() => iniciarBusca(busca)}>
            <Text style={styles.botaoTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!carregando && !erro ? (
        <FlatList
          style={styles.lista}
          data={doacoes}
          keyExtractor={(doacao) => doacao.id}
          onEndReached={carregarMais}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <Text style={styles.campo}>
              {busca.trim() ? `Nenhuma doação encontrada para "${busca}".` : 'Nenhuma doação cadastrada ainda.'}
            </Text>
          }
          ListFooterComponent={carregandoMais ? <ActivityIndicator color="#1B3A5C" /> : null}
          renderItem={({ item }) => (
            <ItemDoacao
              doacao={item}
              onPress={() => navigation.navigate('DetalheDoacao', { id: item.id })}
            />
          )}
        />
      ) : null}
    </View>
  );
}
