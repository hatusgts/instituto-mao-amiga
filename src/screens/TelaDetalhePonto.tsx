import { useCallback, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetalhePonto } from '../components/DetalhePonto';
import { ErroApi } from '../services/api';
import { buscarPonto, excluirPonto } from '../services/pontosService';
import { RootStackParamList } from '../types/navegacao';
import { Ponto } from '../types/ponto';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export function TelaDetalhePonto({ route, navigation }: Props) {
  const { id } = route.params;
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [mensagem, setMensagem] = useState('Carregando ponto...');
  const [erroExclusao, setErroExclusao] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarPonto(id)
        .then((p) => setPonto(p))
        .catch((e: unknown) => {
          setPonto(null);
          if (e instanceof ErroApi && e.status === 404) {
            setMensagem('Ponto não encontrado');
          } else {
            setMensagem('Não foi possível carregar o ponto. Verifique se a API está ligada.');
          }
        });
    }, [id])
  );

  async function excluirEVoltar() {
    try {
      await excluirPonto(id);
      navigation.goBack();
    } catch {
      setErroExclusao('Não foi possível excluir o ponto. Verifique se a API está ligada.');
    }
  }

  function confirmarExclusao() {
    setErroExclusao('');
    if (Platform.OS === 'web') {
      if (window.confirm('Tem certeza que deseja excluir este ponto?')) {
        excluirEVoltar();
      }
      return;
    }

    Alert.alert('Excluir ponto', 'Tem certeza que deseja excluir este ponto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: excluirEVoltar },
    ]);
  }

  if (!ponto) {
    return (
      <ScrollView style={styles.scroll}>
        <Text style={[styles.campo, styles.container]}>{mensagem}</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.scroll}>
      <DetalhePonto ponto={ponto} />
      <View style={styles.container}>
        {erroExclusao ? <Text style={styles.erro}>{erroExclusao}</Text> : null}

        <TouchableOpacity
          style={[styles.botaoSecundario, styles.lista]}
          onPress={() => navigation.navigate('FormularioPonto', { ponto })}
        >
          <Text style={styles.botaoSecundarioTexto}>Editar ponto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={confirmarExclusao}>
          <Text style={styles.botaoTexto}>Excluir ponto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
