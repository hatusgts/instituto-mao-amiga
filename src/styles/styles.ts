import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemLista: {
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginBottom: 10,
  },
  campo: {
    fontSize: 15,
    marginTop: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  inputErro: {
    borderColor: '#C0392B',
  },
  erro: {
    color: '#C0392B',
    fontSize: 13,
    marginTop: 4,
  },
  sucesso: {
    color: '#1E7B34',
    fontSize: 14,
    marginTop: 16,
  },
  opcaoPonto: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  opcaoPontoSelecionada: {
    borderColor: '#1B3A5C',
    backgroundColor: '#E8EEF4',
  },
  opcaoPontoTexto: {
    fontSize: 15,
  },
  opcaoPontoTextoSelecionado: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  botao: {
    backgroundColor: '#1B3A5C',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#1B3A5C',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  botaoSecundarioTexto: {
    color: '#1B3A5C',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
