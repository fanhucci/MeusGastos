import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { listaScreens } from "@/app";
import { baseScreenContainer } from "@/app/theme/tema";

type PerfilScreenNavigationProp = BottomTabNavigationProp<listaScreens,"HomeTabs">;

export type PerfilScreenProp = {
    navigation:PerfilScreenNavigationProp;
}

export default function PerfilScreen({navigation}:PerfilScreenProp){
    return(
        <SafeAreaView style={baseScreenContainer.container}>
            <Text>Area do perfil</Text>
        </SafeAreaView>
    );
};