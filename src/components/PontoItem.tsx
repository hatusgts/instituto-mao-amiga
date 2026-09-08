import { Text, TouchableOpacity } from 'react-native';
import { Ponto } from '../types/Ponto';
import { styles } from '../styles/styles';

export function PontoItem({ ponto, onPress }: { ponto: Ponto; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.itemLista} onPress={onPress}>
      <Text style={styles.itemNome}>{ponto.nome}</Text>
    </TouchableOpacity>
  );
}
