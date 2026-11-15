import { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Doacao } from '../types/doacao';
import { styles } from '../styles/styles';

type Props = {
  doacao: Doacao;
  onPress: () => void;
};

function ItemDoacaoBase({ doacao, onPress }: Props) {
  const data = new Date(doacao.criadoEm).toLocaleDateString();

  return (
    <TouchableOpacity style={styles.itemLista} onPress={onPress}>
      <Text style={styles.itemNome}>{doacao.tipoItem} - {doacao.quantidade}</Text>
      <Text style={styles.campo}>Destino: {doacao.pontoDestino}</Text>
      <Text style={styles.campo}>Data: {data}</Text>
    </TouchableOpacity>
  );
}

export const ItemDoacao = memo(ItemDoacaoBase);
