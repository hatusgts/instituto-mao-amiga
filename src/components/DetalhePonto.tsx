import { Text, View } from 'react-native';
import { Ponto } from '../types/ponto';
import { styles } from '../styles/styles';

export function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.campo}>Endereço: {ponto.endereco}</Text>
      <Text style={styles.campo}>Bairro: {ponto.bairro}</Text>
      <Text style={styles.campo}>Horário: {ponto.horario}</Text>
      <Text style={styles.campo}>Tipo: {ponto.tipo}</Text>
    </View>
  );
}
