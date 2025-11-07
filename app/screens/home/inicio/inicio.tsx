import { listaScreens } from "@/app";
import SubmitButton from "@/app/components/submitButton";
import UserInputText from "@/app/components/userInputText";
import InicioHeader from "@/app/screens/home/inicio/inicioHeader";
import { cores } from "@/app/theme/referencias/colors";
import { baseScreenContainer } from "@/app/theme/tema";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InicioBody from "./inicioBody";




type InicioScreenNavigationProp = BottomTabNavigationProp<listaScreens,"HomeTabs"> 

export type InicioScreenProp = {
    navigation:InicioScreenNavigationProp;
};

export default function InicioScreen({navigation}:InicioScreenProp){
    const [modalVisivel,setModalVisivel] = useState(false);
    const [valorGasto,setValorGasto] = useState('');
    const [descricao,setDescricao] = useState('');
    const [categoria,setCategoria] = useState('');

    return(
        
        <SafeAreaView style={baseScreenContainer.screenContainer}>
            
            {/* <Modal
                style={{justifyContent:'center'}}
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={()=>setModalVisivel(false)}
            >
                <View style={{
                    flex:1,
                    backgroundColor:"rgba(0,0,0,0.5)", 
                    alignItems:'center', 
                    justifyContent:'space-around'
                }}>

                    <View style={[baseScreenContainer.containerBase,{backgroundColor:cores.background, borderRadius:10, padding:10}]}>
                        <UserInputText label="Valor" onChangeText={setValorGasto} valor={valorGasto} teclado={'numeric'} tipo="tertiary"/>
                        <UserInputText label="Descrição" onChangeText={setDescricao} valor={descricao} teclado="default" tipo="tertiary"/>
                        <UserInputText label="Categoria" onChangeText={setCategoria} valor={categoria} teclado="default" tipo="tertiary"/>

                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <SubmitButton titulo="Cancelar" tipo="tertiary" funcao={()=>setModalVisivel(false)}/>
                            <SubmitButton titulo="Salvar" tipo="primary" funcao={()=>setModalVisivel(false)}/>
                        </View>
                    </View>

                    
                </View>

            </Modal> */}
            
            <InicioHeader/>
            
            {/* conteudo principal da pagina */}
            <InicioBody/>


        </SafeAreaView>
    );
};