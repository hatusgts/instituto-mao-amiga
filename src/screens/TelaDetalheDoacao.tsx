import { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { excluirDoacao } from '../services/doacoesStorage';
import { buscarPonto } from '../services/pontosService';
import { RootStackParamList } from '../types/navegacao';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheDoacao'>;

export function TelaDetalheDoacao({ route, navigation }: Props) {
  const { doacao } = route.params;
  const [nomePonto, setNomePonto] = useState('Carregando...');
  const data = new Date(doacao.criadoEm).toLocaleDateString();

  useEffect(() => {
    buscarPonto(doacao.pontoDestino)
      .then((ponto) => setNomePonto(ponto.nome))
      .catch(() => setNomePonto('Ponto ' + doacao.pontoDestino));
  }, [doacao.pontoDestino]);

  async function excluirEVoltar() {
    await excluirDoacao(doacao.id);
    navigation.goBack();
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

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{doacao.tipoItem}</Text>
      <Text style={styles.campo}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.campo}>Destino: {nomePonto}</Text>
      <Text style={styles.campo}>Data: {data}</Text>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Cadastro', { doacaoParaEditar: doacao })}
      >
        <Text style={styles.botaoSecundarioTexto}>Editar doação</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={confirmarExclusao}>
        <Text style={styles.botaoTexto}>Excluir doação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
