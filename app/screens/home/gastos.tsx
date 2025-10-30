import { listaScreens } from "@/app";
import { baseScreenContainer } from "@/app/theme/tema";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type GastosScreenNavigationProp = BottomTabNavigationProp<listaScreens,'HomeTabs'>;

export type GastosScreenProp = {
    navigation: GastosScreenNavigationProp;
};

export default function GastosScreen({navigation}:GastosScreenProp){
    return(
        <SafeAreaView style={baseScreenContainer.container}>
            <Text>Tela de gastos</Text>
        </SafeAreaView>
    );
};