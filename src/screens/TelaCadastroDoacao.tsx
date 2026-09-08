import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { pontosMock } from '../data/pontos';
import { styles } from '../styles/styles';

type Erros = {
  tipo?: string;
  quantidade?: string;
  ponto?: string;
};

export function TelaCadastroDoacao() {
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoId, setPontoId] = useState('');
  const [erros, setErros] = useState<Erros>({});
  const [valido, setValido] = useState(false);

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
    setValido(Object.keys(novos).length === 0);
  }

  function alterar(set: (valor: string) => void) {
    return (valor: string) => {
      set(valor);
      setValido(false);
    };
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastrar Doação</Text>

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
        <Text style={styles.botaoTexto}>Cadastrar doação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
