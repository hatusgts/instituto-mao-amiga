import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { adicionarDoacao, atualizarDoacao } from '../services/doacoesStorage';
import { listarPontos } from '../services/pontosService';
import { Doacao } from '../types/doacao';
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
  const doacaoParaEditar = route.params?.doacaoParaEditar;

  const [tipo, setTipo] = useState(doacaoParaEditar ? doacaoParaEditar.tipoItem : '');
  const [quantidade, setQuantidade] = useState(doacaoParaEditar ? String(doacaoParaEditar.quantidade) : '');
  const [pontoId, setPontoId] = useState<number | null>(doacaoParaEditar ? doacaoParaEditar.pontoDestino : null);
  const [erros, setErros] = useState<Erros>({});
  const [valido, setValido] = useState(false);
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [erroPontos, setErroPontos] = useState(false);

  useEffect(() => {
    listarPontos()
      .then((lista) => setPontos(lista))
      .catch(() => setErroPontos(true));
  }, []);

  function validar() {
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

    if (pontoId === null) {
      novos.ponto = 'Escolha o ponto de destino';
    }

    setErros(novos);
    const ok = Object.keys(novos).length === 0;
    setValido(ok);

    if (!ok || pontoId === null) {
      return;
    }

    if (doacaoParaEditar) {
      const doacaoAtualizada: Doacao = {
        ...doacaoParaEditar,
        tipoItem: tipo,
        quantidade: Number(qtd),
        pontoDestino: pontoId,
      };
      atualizarDoacao(doacaoAtualizada).then(() => {
        navigation.popTo('DetalheDoacao', { doacao: doacaoAtualizada });
      });
    } else {
      adicionarDoacao({
        id: Date.now(),
        tipoItem: tipo,
        quantidade: Number(qtd),
        pontoDestino: pontoId,
        criadoEm: new Date().toISOString(),
      });
    }
  }

  function alterar(set: (valor: string) => void) {
    return (valor: string) => {
      set(valor);
      setValido(false);
    };
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
        onChangeText={alterar(setTipo)}
        placeholder="Ex: arroz, agasalho, leite"
      />
      {erros.tipo ? <Text style={styles.erro}>{erros.tipo}</Text> : null}

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={[styles.input, erros.quantidade ? styles.inputErro : null]}
        value={quantidade}
        onChangeText={alterar(setQuantidade)}
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
            style={[styles.opcaoPonto, pontoId === ponto.id ? styles.opcaoPontoSelecionada : null]}
            onPress={() => {
              setPontoId(ponto.id);
              setValido(false);
            }}
          >
            <Text style={pontoId === ponto.id ? styles.opcaoPontoTextoSelecionado : styles.opcaoPontoTexto}>
              {ponto.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {erros.ponto ? <Text style={styles.erro}>{erros.ponto}</Text> : null}

      {valido ? <Text style={styles.sucesso}>Formulário válido</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={validar}>
        <Text style={styles.botaoTexto}>{doacaoParaEditar ? 'Salvar alterações' : 'Cadastrar doação'}</Text>
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
