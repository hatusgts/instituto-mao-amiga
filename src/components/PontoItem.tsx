import { Text, TouchableOpacity, View } from 'react-native';
import { Ponto } from '../types/ponto';
import { styles } from '../styles/styles';

type Props = {
  ponto: Ponto;
  favorito: boolean;
  onPress: () => void;
  onFavoritar: () => void;
};

export function PontoItem({ ponto, favorito, onPress, onFavoritar }: Props) {
  return (
    <View style={[styles.itemLista, styles.linhaPonto]}>
      <TouchableOpacity style={styles.infoPonto} onPress={onPress}>
        <Text style={styles.itemNome}>{ponto.nome}</Text>
        <Text style={styles.campo}>{ponto.bairro}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoFavorito} onPress={onFavoritar}>
        <Text style={styles.favoritoTexto}>{favorito ? '♥' : '♡'}</Text>
      </TouchableOpacity>
    </View>
  );
}
