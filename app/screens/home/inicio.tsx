import { Modal, ScrollView, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseScreenContainer } from "@/app/theme/tema";
import { listaScreens } from "@/app";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import SubmitButton from "@/app/components/submitButton";
import { useState } from "react";
import UserInputText from "@/app/components/userInputText";
import { cores } from "@/app/theme/referencias/colors";
import FilterButton from "@/app/components/filterButton";


type InicioScreenNavigationProp = BottomTabNavigationProp<listaScreens,"HomeTabs"> 

export type InicioScreenProp = {
    navigation:InicioScreenNavigationProp;
};

export default function InicioScreen({navigation}:InicioScreenProp){
    const [modalVisivel,setModalVisivel] = useState(false);
    const [valorGasto,setValorGasto] = useState('');
    const [descricao,setDescricao] = useState('');
    const [categoria,setCategoria] = useState('');

    const filtros = ["Diario","Mensal","Anual"];
    const valores = {
        Diario:'R$400,00',
        Mensal:'R$800,00',
        Anual:"R$10000,00"
    }

    const [filtroSelecionado,setFiltroSelecionado] = useState(filtros[0]);

    return(
        <SafeAreaView style={[baseScreenContainer.container,{backgroundColor:cores.secondary,justifyContent:'center',padding:0,margin:0}]}>
            
            <Modal
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

            </Modal>

            <View style={{alignItems:'center',paddingBottom:50}}>
                
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    {
                        filtros.map((f,index)=>(
                            <FilterButton key={index} texto={f} filtro={f} funcao={()=>(setFiltroSelecionado(f))} valor={filtroSelecionado}/>
                        ))
                    }
                </View>
                <Text>Gastos</Text>
                <Text>{valores[filtroSelecionado]}</Text>
            </View>
            
            <View style={[baseScreenContainer.container,{padding:0,margin:0,height:'100%',width:'95%',backgroundColor:cores.text,borderRadius:10}]}>
                <ScrollView>
                    <Text>teste</Text>
                </ScrollView>
                <SubmitButton titulo="registrar gasto" tipo="primary" funcao={()=>setModalVisivel(true)}/>
            </View>

            

        </SafeAreaView>
    );
};