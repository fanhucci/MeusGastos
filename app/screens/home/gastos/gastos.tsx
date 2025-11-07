import { listaScreens } from "@/app";
import { baseScreenContainer } from "@/app/theme/tema";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import GastosHeader from "./gastosHeader";
import GastosBody from "./gastosBody";

type GastosScreenNavigationProp = BottomTabNavigationProp<listaScreens,'HomeTabs'>;

export type GastosScreenProp = {
    navigation: GastosScreenNavigationProp;
};


export default function GastosScreen({navigation}:GastosScreenProp){


    return(

        <SafeAreaView style={baseScreenContainer.screenContainer}>
            
            <GastosHeader/>

            <GastosBody/>


        </SafeAreaView>

    );

};
