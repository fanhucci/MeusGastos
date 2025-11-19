//import { NavigationContainer } from "@react-navigation/native"; - linha 10
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./homeTabs";
import CadastroScreen from "./screens/autenticar/cadastro";
import LoginScreen from "./screens/autenticar/login";
import UserProvider from "@/contexts/userContext";

export type listaScreens = {
  Login: undefined,
  Cadastro: undefined,
  HomeTabs: undefined
}

export default function Index() {

  const Stack = createNativeStackNavigator<listaScreens>();
  
  
  return (
    
    //foi removido o componente <NavigationContainer> pois ele dava erro de navigationNesting, provavelmente o expo cria um proprio wrapper em volta da aplicação
      <UserProvider>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{headerShown:false}}/>
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{headerShown:false}}/>
        </Stack.Navigator>
      </UserProvider>
  );
}
