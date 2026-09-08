import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TelaListaPontos } from './src/screens/TelaListaPontos';
import { TelaDetalhePonto } from './src/screens/TelaDetalhePonto';
import { TelaCadastroDoacao } from './src/screens/TelaCadastroDoacao';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={TelaListaPontos} options={{ title: 'Pontos' }} />
        <Stack.Screen name="Detalhe" component={TelaDetalhePonto} options={{ title: 'Detalhe do Ponto' }} />
        <Stack.Screen name="Cadastro" component={TelaCadastroDoacao} options={{ title: 'Cadastrar Doação' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
