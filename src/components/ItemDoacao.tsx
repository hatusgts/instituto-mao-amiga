import { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Doacao } from '../types/doacao';
import { styles } from '../styles/styles';

type Props = {
  doacao: Doacao;
  nomePonto: string;
  onPress: () => void;
};

function ItemDoacaoBase({ doacao, nomePonto, onPress }: Props) {
  const data = new Date(doacao.criadoEm).toLocaleDateString();

  return (
    <TouchableOpacity style={styles.itemLista} onPress={onPress}>
      <Text style={styles.itemNome}>{doacao.tipoItem} - {doacao.quantidade}</Text>
      <Text style={styles.campo}>Destino: {nomePonto}</Text>
      <Text style={styles.campo}>Data: {data}</Text>
    </TouchableOpacity>
  );
}

export const ItemDoacao = memo(ItemDoacaoBase);
