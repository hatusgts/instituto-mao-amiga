import { memo } from 'react';
import { Text, View } from 'react-native';
import { pontosMock } from '../data/pontos';
import { styles } from '../styles/styles';

function ItemDoacaoBase({ doacao }: { doacao: any }) {
  const ponto = pontosMock.find((p) => p.id === doacao.pontoId);
  const data = new Date(doacao.data).toLocaleDateString();

  return (
    <View style={styles.itemLista}>
      <Text style={styles.itemNome}>{doacao.tipo} - {doacao.quantidade}</Text>
      <Text style={styles.campo}>Destino: {ponto ? ponto.nome : 'Ponto não encontrado'}</Text>
      <Text style={styles.campo}>Data: {data}</Text>
    </View>
  );
}

export const ItemDoacao = memo(ItemDoacaoBase);
