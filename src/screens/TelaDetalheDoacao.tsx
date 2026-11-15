import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ErroApi } from '../services/api';
import { buscarDoacao, excluirDoacao } from '../services/doacoesService';
import { Doacao } from '../types/doacao';
import { RootStackParamList } from '../types/navegacao';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheDoacao'>;

export function TelaDetalheDoacao({ route, navigation }: Props) {
  const { id } = route.params;
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<'naoEncontrada' | 'api' | null>(null);
  const [erroAcao, setErroAcao] = useState('');
  const [excluindo, setExcluindo] = useState(false);

  async function carregar() {
    try {
      setDoacao(await buscarDoacao(id));
      setErro(null);
    } catch (e) {
      setDoacao(null);
      setErro(e instanceof ErroApi && e.status === 404 ? 'naoEncontrada' : 'api');
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [id])
  );

  async function excluirEVoltar() {
    setErroAcao('');
    setExcluindo(true);
    try {
      await excluirDoacao(id);
      navigation.goBack();
    } catch (e) {
      setErroAcao(
        e instanceof ErroApi && e.status === 404
          ? 'Doação não encontrada. Ela pode já ter sido excluída.'
          : 'Não foi possível excluir a doação. Verifique se a API está ligada.'
      );
      setExcluindo(false);
    }
  }

  function confirmarExclusao() {
    if (Platform.OS === 'web') {
      if (window.confirm('Tem certeza que deseja excluir esta doação?')) {
        excluirEVoltar();
      }
      return;
    }

    Alert.alert('Excluir doação', 'Tem certeza que deseja excluir esta doação?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: excluirEVoltar },
    ]);
  }

  if (carregando) {
    return (
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <ActivityIndicator size="large" color="#1B3A5C" />
        <Text style={styles.campo}>Carregando doação...</Text>
      </ScrollView>
    );
  }

  if (erro === 'naoEncontrada') {
    return (
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Doação não encontrada</Text>
        <Text style={styles.campo}>Essa doação não existe mais.</Text>
      </ScrollView>
    );
  }

  if (erro === 'api' || doacao === null) {
    return (
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <Text style={styles.erro}>Não foi possível carregar a doação. Verifique se a API está ligada.</Text>
        <TouchableOpacity style={styles.botao} onPress={carregar}>
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const data = new Date(doacao.criadoEm).toLocaleDateString();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{doacao.tipoItem}</Text>
      <Text style={styles.campo}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.campo}>Destino: {doacao.pontoDestino}</Text>
      <Text style={styles.campo}>Data: {data}</Text>

      {erroAcao ? <Text style={styles.erro}>{erroAcao}</Text> : null}

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Cadastro', { doacao })}
      >
        <Text style={styles.botaoSecundarioTexto}>Editar doação</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={confirmarExclusao} disabled={excluindo}>
        <Text style={styles.botaoTexto}>{excluindo ? 'Excluindo...' : 'Excluir doação'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
