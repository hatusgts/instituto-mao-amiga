import { Text, View } from 'react-native';
import { Ponto } from '../types/Ponto';
import { styles } from '../styles/styles';

export function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.campo}>Endereço: {ponto.endereco}</Text>
      <Text style={styles.campo}>Dias e horários: {ponto.diasHorarios}</Text>
      <Text style={styles.campo}>Recebe/Distribui: {ponto.recebeDistribui}</Text>
    </View>
  );
}
