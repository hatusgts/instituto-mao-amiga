import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pontosMock } from '../data/pontos';
import { atualizarDoacao } from '../data/doacoesStorage';
import { styles } from '../styles/styles';

type Erros = {
  tipo?: string;
  quantidade?: string;
  ponto?: string;
};

const CHAVE_DOACOES = '@instituto_mao_amiga:doacoes';

export function TelaCadastroDoacao({ route, navigation }: any) {
  const doacaoParaEditar = route?.params?.doacaoParaEditar;

  const [tipo, setTipo] = useState(doacaoParaEditar?.tipo ?? '');
  const [quantidade, setQuantidade] = useState(doacaoParaEditar?.quantidade ?? '');
  const [pontoId, setPontoId] = useState(doacaoParaEditar?.pontoId ?? '');
  const [erros, setErros] = useState<Erros>({});
  const [valido, setValido] = useState(false);
  const [doacoes, setDoacoes] = useState<any[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE_DOACOES).then((salvo) => {
      if (salvo) setDoacoes(JSON.parse(salvo));
    });
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

    if (!pontoId) {
      novos.ponto = 'Escolha o ponto de destino';
    }

    setErros(novos);
    const ok = Object.keys(novos).length === 0;
    setValido(ok);

    if (ok) {
      if (doacaoParaEditar) {
        const doacaoAtualizada = { ...doacaoParaEditar, tipo, quantidade, pontoId };
        atualizarDoacao(doacaoAtualizada).then(() => {
          navigation.navigate('DetalheDoacao', { doacao: doacaoAtualizada });
        });
      } else {
        const doacao = { id: Date.now(), tipo, quantidade, pontoId, data: new Date().toISOString() };
        setDoacoes((atual) => {
          const novo = [...atual, doacao];
          AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(novo));
          return novo;
        });
      }
    }
  }

  function alterar(set: (valor: string) => void) {
    return (valor: string) => {
      set(valor);
      setValido(false);
    };
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
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
      <View>
        {pontosMock.map((ponto) => (
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
  );
}
