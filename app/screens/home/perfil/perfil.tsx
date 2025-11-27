import { listaScreens } from "@/app";
import { baseScreenContainer } from "@/app/theme/tema";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import PerfilHeader from "./perfilHeader";
import PerfilBody from "./perfilBody";
import { useContext, useEffect } from "react";

import { auth } from "@/firebaseConfig";
import { UserContext } from "@/contexts/userContext";
import CarregamentoModal from "@/app/components/carregamentoModal";


type PerfilScreenNavigationProp = BottomTabNavigationProp<listaScreens,"HomeTabs">;

export type PerfilScreenProp = {
    navigation:PerfilScreenNavigationProp;
}

export default function PerfilScreen({navigation}:PerfilScreenProp){

    const {user,atualizaUsuario} = useContext(UserContext);

    useEffect(() => {
        if (auth.currentUser && !user) {
            atualizaUsuario(auth.currentUser.uid);
        }
    }, [user]);
    
    
    if (!user) {
        return (
            <CarregamentoModal/>
        );
    }

    return(

        <SafeAreaView style={baseScreenContainer.screenContainer}>

            <PerfilHeader/>

            <PerfilBody/>

        </SafeAreaView>

    );
};


