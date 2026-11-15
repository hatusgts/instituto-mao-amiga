import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ErroApi } from '../services/api';
import { cadastrarDoacao, editarDoacao } from '../services/doacoesService';
import { listarPontos } from '../services/pontosService';
import { RootStackParamList } from '../types/navegacao';
import { Ponto } from '../types/ponto';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

type Erros = {
  tipo?: string;
  quantidade?: string;
  ponto?: string;
};

export function TelaCadastroDoacao({ route, navigation }: Props) {
  const doacaoParaEditar = route.params?.doacao;

  const [tipo, setTipo] = useState(doacaoParaEditar ? doacaoParaEditar.tipoItem : '');
  const [quantidade, setQuantidade] = useState(doacaoParaEditar ? String(doacaoParaEditar.quantidade) : '');
  const [pontoDestino, setPontoDestino] = useState<string | null>(doacaoParaEditar ? doacaoParaEditar.pontoDestino : null);
  const [erros, setErros] = useState<Erros>({});
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [erroPontos, setErroPontos] = useState(false);
  const [erroEnvio, setErroEnvio] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarPontos()
      .then((lista) => setPontos(lista))
      .catch(() => setErroPontos(true));
  }, []);

  async function validar() {
    const novos: Erros = {};

    if (!tipo.trim()) {
      novos.tipo = 'Informe o tipo do item';
    }

    const qtd = quantidade.trim();
    if (!qtd) {
      novos.quantidade = 'Informe a quantidade';
    } else if (!/^[0-9]+$/.test(qtd)) {
      novos.quantidade = 'Quantidade aceita apenas números';
    } else if (Number(qtd) < 1) {
      novos.quantidade = 'Quantidade deve ser maior que zero';
    }

    if (pontoDestino === null) {
      novos.ponto = 'Escolha o ponto de destino';
    }

    setErros(novos);
    setErroEnvio('');

    if (Object.keys(novos).length > 0 || pontoDestino === null) {
      return;
    }

    setEnviando(true);
    try {
      const dados = {
        tipoItem: tipo.trim(),
        quantidade: Number(qtd),
        pontoDestino,
      };
      if (doacaoParaEditar) {
        await editarDoacao(doacaoParaEditar.id, dados);
      } else {
        await cadastrarDoacao(dados);
      }
      navigation.goBack();
    } catch (e) {
      if (e instanceof ErroApi && e.status === 404) {
        setErroEnvio('Doação não encontrada. Ela pode ter sido excluída.');
      } else if (e instanceof ErroApi) {
        setErroEnvio('A API recusou a doação. Confira os dados e tente novamente.');
      } else {
        setErroEnvio('Não foi possível enviar a doação. Verifique se a API está ligada.');
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.scroll}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{doacaoParaEditar ? 'Editar Doação' : 'Cadastrar Doação'}</Text>

      <Text style={styles.label}>Tipo do item</Text>
      <TextInput
        style={[styles.input, erros.tipo ? styles.inputErro : null]}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Ex: arroz, agasalho, leite"
      />
      {erros.tipo ? <Text style={styles.erro}>{erros.tipo}</Text> : null}

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={[styles.input, erros.quantidade ? styles.inputErro : null]}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        placeholder="Ex: 10"
      />
      {erros.quantidade ? <Text style={styles.erro}>{erros.quantidade}</Text> : null}

      <Text style={styles.label}>Ponto de destino</Text>
      {erroPontos ? (
        <Text style={styles.erro}>Não foi possível carregar os pontos. Verifique se a API está ligada.</Text>
      ) : null}
      <View>
        {pontos.map((ponto) => (
          <TouchableOpacity
            key={ponto.id}
            style={[styles.opcaoPonto, pontoDestino === ponto.nome ? styles.opcaoPontoSelecionada : null]}
            onPress={() => setPontoDestino(ponto.nome)}
          >
            <Text style={pontoDestino === ponto.nome ? styles.opcaoPontoTextoSelecionado : styles.opcaoPontoTexto}>
              {ponto.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {erros.ponto ? <Text style={styles.erro}>{erros.ponto}</Text> : null}

      {erroEnvio ? <Text style={styles.erro}>{erroEnvio}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={validar} disabled={enviando}>
        <Text style={styles.botaoTexto}>{enviando ? 'Enviando...' : doacaoParaEditar ? 'Salvar alterações' : 'Cadastrar doação'}</Text>
      </TouchableOpacity>

      {doacaoParaEditar ? (
        <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoSecundarioTexto}>Cancelar</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
