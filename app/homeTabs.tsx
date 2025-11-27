import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GastosScreen from "./screens/home/gastos/gastos";
import InicioScreen from "./screens/home/inicio/inicio";
import PerfilScreen from "./screens/home/perfil/perfil";
import { cores } from "./theme/referencias/colors";

export default function HomeTabs(){
    
    const Tabs = createBottomTabNavigator();

    return(
        <Tabs.Navigator screenOptions={({route})=>({
          
            headerShown:false,
            headerStyle:{ backgroundColor:cores.primary},
            headerTintColor:cores.text,
            tabBarActiveTintColor:cores.secondary,
            tabBarInactiveTintColor:cores.text,
            tabBarStyle:{
              backgroundColor:cores.primary,
              position: 'absolute',
              borderTopWidth: 0,
              bottom: 0,
              height: 60,
            },
            tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Inicio') {
              return <FontAwesome5 name="home" size={size} color={color} />;
            }
            else if(route.name === "Gastos"){
                return <FontAwesome5 name="money-check-alt" size={24} color={color} />
            } 
            else if (route.name === 'Perfil') {
              return <FontAwesome5 name="user-alt" size={size} color={color} />;
            }
          },

        })}>

            <Tabs.Screen name="Inicio" component={InicioScreen}/>
            <Tabs.Screen name="Gastos" component={GastosScreen}/>
            <Tabs.Screen name="Perfil" component={PerfilScreen}/>
        </Tabs.Navigator>
    );
};