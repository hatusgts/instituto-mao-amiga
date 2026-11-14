import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ErroApi } from '../services/api';
import { cadastrarPonto, editarPonto } from '../services/pontosService';
import { RootStackParamList } from '../types/navegacao';
import { PontoRequest } from '../types/ponto';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'FormularioPonto'>;

type Erros = {
  nome?: string;
  endereco?: string;
  bairro?: string;
  horario?: string;
  tipo?: string;
};

const TIPOS = ['coleta', 'distribuição'];

export function TelaFormularioPonto({ route, navigation }: Props) {
  const pontoParaEditar = route.params?.ponto;

  const [nome, setNome] = useState(pontoParaEditar ? pontoParaEditar.nome : '');
  const [endereco, setEndereco] = useState(pontoParaEditar ? pontoParaEditar.endereco : '');
  const [bairro, setBairro] = useState(pontoParaEditar ? pontoParaEditar.bairro : '');
  const [horario, setHorario] = useState(pontoParaEditar ? pontoParaEditar.horario : '');
  const [tipo, setTipo] = useState(pontoParaEditar ? pontoParaEditar.tipo : '');
  const [erros, setErros] = useState<Erros>({});
  const [erroApi, setErroApi] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    const novos: Erros = {};
    if (!nome.trim()) novos.nome = 'Informe o nome';
    if (!endereco.trim()) novos.endereco = 'Informe o endereço';
    if (!bairro.trim()) novos.bairro = 'Informe o bairro';
    if (!horario.trim()) novos.horario = 'Informe o horário';
    if (!tipo) novos.tipo = 'Escolha o tipo';

    setErros(novos);
    setErroApi('');
    if (Object.keys(novos).length > 0) {
      return;
    }

    const dados: PontoRequest = {
      nome: nome.trim(),
      endereco: endereco.trim(),
      bairro: bairro.trim(),
      horario: horario.trim(),
      tipo,
    };

    setSalvando(true);
    try {
      if (pontoParaEditar) {
        await editarPonto(pontoParaEditar.id, dados);
      } else {
        await cadastrarPonto(dados);
      }
      navigation.goBack();
    } catch (e: unknown) {
      if (e instanceof ErroApi && e.status === 400) {
        setErroApi('A API recusou os dados. Confira os campos e tente de novo.');
      } else {
        setErroApi('Não foi possível salvar. Verifique se a API está ligada.');
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.scroll}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{pontoParaEditar ? 'Editar Ponto' : 'Cadastrar Ponto'}</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={[styles.input, erros.nome ? styles.inputErro : null]}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Ponto Setor Marista"
      />
      {erros.nome ? <Text style={styles.erro}>{erros.nome}</Text> : null}

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={[styles.input, erros.endereco ? styles.inputErro : null]}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Ex: Rua 10, 250"
      />
      {erros.endereco ? <Text style={styles.erro}>{erros.endereco}</Text> : null}

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        style={[styles.input, erros.bairro ? styles.inputErro : null]}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Ex: Setor Marista"
      />
      {erros.bairro ? <Text style={styles.erro}>{erros.bairro}</Text> : null}

      <Text style={styles.label}>Horário</Text>
      <TextInput
        style={[styles.input, erros.horario ? styles.inputErro : null]}
        value={horario}
        onChangeText={setHorario}
        placeholder="Ex: Seg a Sex, 8h às 17h"
      />
      {erros.horario ? <Text style={styles.erro}>{erros.horario}</Text> : null}

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.linha}>
        {TIPOS.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[styles.opcaoPonto, styles.opcaoTipo, tipo === opcao ? styles.opcaoPontoSelecionada : null]}
            onPress={() => setTipo(opcao)}
          >
            <Text style={tipo === opcao ? styles.opcaoPontoTextoSelecionado : styles.opcaoPontoTexto}>{opcao}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {erros.tipo ? <Text style={styles.erro}>{erros.tipo}</Text> : null}

      {erroApi ? <Text style={styles.erro}>{erroApi}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={salvar} disabled={salvando}>
        <Text style={styles.botaoTexto}>
          {salvando ? 'Salvando...' : pontoParaEditar ? 'Salvar alterações' : 'Cadastrar ponto'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoSecundarioTexto}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
