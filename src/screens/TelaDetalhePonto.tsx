import { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetalhePonto } from '../components/DetalhePonto';
import { ErroApi } from '../services/api';
import { buscarPonto } from '../services/pontosService';
import { RootStackParamList } from '../types/navegacao';
import { Ponto } from '../types/ponto';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export function TelaDetalhePonto({ route }: Props) {
  const { id } = route.params;
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [mensagem, setMensagem] = useState('Carregando ponto...');

  useEffect(() => {
    buscarPonto(id)
      .then((p) => setPonto(p))
      .catch((e: unknown) => {
        if (e instanceof ErroApi && e.status === 404) {
          setMensagem('Ponto não encontrado');
        } else {
          setMensagem('Não foi possível carregar o ponto. Verifique se a API está ligada.');
        }
      });
  }, [id]);

  return (
    <ScrollView style={styles.scroll}>
      {ponto ? <DetalhePonto ponto={ponto} /> : <Text style={[styles.campo, styles.container]}>{mensagem}</Text>}
    </ScrollView>
  );
}
