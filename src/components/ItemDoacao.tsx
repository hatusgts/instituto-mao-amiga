import { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { pontosMock } from '../data/pontos';
import { styles } from '../styles/styles';

function ItemDoacaoBase({ doacao, onPress }: { doacao: any; onPress: () => void }) {
  const ponto = pontosMock.find((p) => p.id === doacao.pontoId);
  const data = new Date(doacao.data).toLocaleDateString();

  return (
    <TouchableOpacity style={styles.itemLista} onPress={onPress}>
      <Text style={styles.itemNome}>{doacao.tipo} - {doacao.quantidade}</Text>
      <Text style={styles.campo}>Destino: {ponto ? ponto.nome : 'Ponto não encontrado'}</Text>
      <Text style={styles.campo}>Data: {data}</Text>
    </TouchableOpacity>
  );
}

export const ItemDoacao = memo(ItemDoacaoBase);
