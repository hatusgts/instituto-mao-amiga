import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  diasHorarios: string;
  recebeDistribui: string;
};

const Stack = createNativeStackNavigator();

const pontosMock: Ponto[] = [
  {
    id: '1',
    nome: 'Ponto Centro',
    endereco: 'Rua das Flores, 123 - Centro',
    diasHorarios: 'Segunda a sexta, 8h às 17h',
    recebeDistribui: 'Recebe alimentos não perecíveis e roupas',
  },
  {
    id: '2',
    nome: 'Ponto Vila Nova',
    endereco: 'Av. Brasil, 456 - Vila Nova',
    diasHorarios: 'Sábados, 9h às 13h',
    recebeDistribui: 'Distribui cestas básicas para famílias cadastradas',
  },
  {
    id: '3',
    nome: 'Ponto Jardim das Flores',
    endereco: 'Rua Tiradentes, 789 - Jardim das Flores',
    diasHorarios: 'Terças e quintas, 14h às 18h',
    recebeDistribui: 'Recebe roupas e calçados, distribui agasalhos no inverno',
  },
];

function PontoItem({ ponto, onPress }: { ponto: Ponto; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.itemLista} onPress={onPress}>
      <Text style={styles.itemNome}>{ponto.nome}</Text>
    </TouchableOpacity>
  );
}

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.campo}>Endereço: {ponto.endereco}</Text>
      <Text style={styles.campo}>Dias e horários: {ponto.diasHorarios}</Text>
      <Text style={styles.campo}>Recebe/Distribui: {ponto.recebeDistribui}</Text>
    </View>
  );
}

function TelaListaPontos({ navigation }: any) {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Pontos de Coleta e Distribuição</Text>
        {pontosMock.map((ponto) => (
          <PontoItem
            key={ponto.id}
            ponto={ponto}
            onPress={() => navigation.navigate('Detalhe', { id: ponto.id })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function TelaDetalhePonto({ route }: any) {
  const { id } = route.params;
  const ponto = pontosMock.find((p) => p.id === id);

  return (
    <ScrollView style={styles.scroll}>
      <DetalhePonto ponto={ponto as Ponto} />
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={TelaListaPontos} options={{ title: 'Pontos' }} />
        <Stack.Screen name="Detalhe" component={TelaDetalhePonto} options={{ title: 'Detalhe do Ponto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
});
