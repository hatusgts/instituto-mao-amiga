import { ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navegacao';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheDoacao'>;

export function TelaDetalheDoacao({ route }: Props) {
  const { doacao } = route.params;
  const data = new Date(doacao.criadoEm).toLocaleDateString();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{doacao.tipoItem}</Text>
      <Text style={styles.campo}>Quantidade: {doacao.quantidade}</Text>
      <Text style={styles.campo}>Destino: {doacao.pontoDestino}</Text>
      <Text style={styles.campo}>Data: {data}</Text>
    </ScrollView>
  );
}
