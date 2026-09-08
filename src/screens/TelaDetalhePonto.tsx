import { ScrollView } from 'react-native';
import { DetalhePonto } from '../components/DetalhePonto';
import { pontosMock } from '../data/pontos';
import { Ponto } from '../types/Ponto';
import { styles } from '../styles/styles';

export function TelaDetalhePonto({ route }: any) {
  const { id } = route.params;
  const ponto = pontosMock.find((p) => p.id === id);

  return (
    <ScrollView style={styles.scroll}>
      <DetalhePonto ponto={ponto as Ponto} />
    </ScrollView>
  );
}
