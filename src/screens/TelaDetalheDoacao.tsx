import { Alert, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { pontosMock } from '../data/pontos';
import { excluirDoacao } from '../data/doacoesStorage';
import { styles } from '../styles/styles';

export function TelaDetalheDoacao({ route, navigation }: any) {
  const { doacao } = route.params;
  const ponto = pontosMock.find((p) => p.id === doacao.pontoId);
  const data = new Date(doacao.data).toLocaleDateString();

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
      <Text style={styles.titulo}>{doacao.tipo}</Text>
      <Text style={styles.campo}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.campo}>Destino: {ponto ? ponto.nome : 'Ponto não encontrado'}</Text>
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
