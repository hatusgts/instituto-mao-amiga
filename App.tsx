import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';
import { TelaListaPontos } from './src/screens/TelaListaPontos';
import { TelaDetalhePonto } from './src/screens/TelaDetalhePonto';
import { TelaCadastroDoacao } from './src/screens/TelaCadastroDoacao';
import { TelaListaDoacoes } from './src/screens/TelaListaDoacoes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={TelaListaPontos} options={{ title: 'Pontos' }} />
        <Stack.Screen
          name="Detalhe"
          component={TelaDetalhePonto}
          options={({ navigation }) => ({
            title: 'Detalhe do Ponto',
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                hitSlop={10}
                style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 24 }}>←</Text>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="Cadastro" component={TelaCadastroDoacao} options={{ title: 'Cadastrar Doação' }} />
        <Stack.Screen name="Doacoes" component={TelaListaDoacoes} options={{ title: 'Doações Cadastradas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
