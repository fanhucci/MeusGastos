import { listaScreens } from "@/app";
import { baseScreenContainer } from "@/app/theme/tema";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import PerfilHeader from "./perfilHeader";
import PerfilBody from "./perfilBody";

type PerfilScreenNavigationProp = BottomTabNavigationProp<listaScreens,"HomeTabs">;

export type PerfilScreenProp = {
    navigation:PerfilScreenNavigationProp;
}

export default function PerfilScreen({navigation}:PerfilScreenProp){

    return(

        <SafeAreaView style={baseScreenContainer.screenContainer}>

            <PerfilHeader/>

            <PerfilBody/>

        </SafeAreaView>

    );
};