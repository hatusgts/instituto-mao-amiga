import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';

const produtosMock = [
  { id: '1', nome: 'Cadeira Confort Plus', preco: 'R$ 349,90', estoque: 5, imagem: require('./assets/produto-cadeira.jpg') },
  { id: '2', nome: 'Mesa para Escritório Compacta', preco: 'R$ 589,00', estoque: 2, imagem: require('./assets/produto-mesa.jpg') },
  { id: '3', nome: 'Luminária de Mesa LED', preco: 'R$ 79,90', estoque: 10, imagem: require('./assets/produto-luminaria.jpg') },
  { id: '4', nome: 'Suporte para Notebook', preco: 'R$ 129,90', estoque: 0, imagem: require('./assets/produto-suporte.jpg') },
];

type ProdutoProps = {
  produto: {
    id: string;
    nome: string;
    preco: string;
    estoque: number;
    imagem: any;
  }
};

function Produto({ produto }: ProdutoProps) {
  const [quantidade, setQuantidade] = useState(0);

  const adicionarItem = () => {
    if (quantidade < produto.estoque) {
      setQuantidade(quantidade + 1);
    }
  };

  return (
    <View style={styles.itemProduto}>
      <Image source={produto.imagem} style={{ width: 50, height: 50, marginBottom: 10 }} />
      
      <Text>Produto: {produto.nome}</Text>
      <Text>Preço: {produto.preco}</Text>
      <Text>Estoque da loja: {produto.estoque}</Text>
      
      <Text style={{ marginTop: 10 }}>Quantidade no carrinho: {quantidade}</Text>
      
      <Button 
        title="Adicionar +1" 
        onPress={adicionarItem} 
        disabled={quantidade >= produto.estoque}
      />
    </View>
  );
}

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Minha Primeira Loja</Text>
      
      {produtosMock.map((item) => (
        <Produto key={item.id} produto={item} />
      ))}
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemProduto: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
  }
});