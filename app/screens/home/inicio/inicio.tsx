import { listaScreens } from "@/app";
import InicioHeader from "@/app/screens/home/inicio/inicioHeader";
import { baseScreenContainer } from "@/app/theme/tema";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InicioBody from "./inicioBody";
import InicioModal from "./inicioModal";
import { UserContext } from "@/contexts/userContext";

import { auth } from "@/firebaseConfig";
import CarregamentoModal from "@/app/components/carregamentoModal";

type InicioScreenNavigationProp = BottomTabNavigationProp<listaScreens,"HomeTabs"> 

export type InicioScreenProp = {
    navigation:InicioScreenNavigationProp;
};

export default function InicioScreen({navigation}:InicioScreenProp){

    const {user,atualizaUsuario} = useContext(UserContext);

    const [modalVisivel,setModalVisivel] = useState(false);

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
            
            <InicioModal getter={modalVisivel} setter={setModalVisivel}/>
            
            <InicioHeader/>
            
            <InicioBody setter={setModalVisivel}/>

        </SafeAreaView>
    );
};