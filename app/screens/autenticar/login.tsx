//componentes customizados
import TextLink from "@/app/components/textLink";
import SubmitButton from "@/app/components/submitButton";
import UserInputText from "@/app/components/userInputText";

//componentes padroes do react navite
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//tipagem das telas
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { listaScreens } from "@/app";

//estilização
import { baseScreenContainer } from "@/app/theme/tema";
import { cores } from "@/app/theme/referencias/colors";
//hooks react
import { useState } from "react";


type LoginScreenNavigationProp = NativeStackNavigationProp<listaScreens,"Login">;

export type LoginScreenProp = {
    navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }:LoginScreenProp){

    const [usuario,setUsuario] = useState('');
    const [senha,setSenha] = useState('');

    async function fazerLogin(){
        console.log('fez login: ',usuario);
        const loginTeste = {
            usuario:'felipe',
            senha:'senha'
        }
        //const resultado = await verificaLogin(usuario,senha);
        navigation.navigate('HomeTabs');
    }

    return(

        <SafeAreaView style={[baseScreenContainer.container,{backgroundColor:cores.primary,justifyContent:'space-around'}]}>

            <View style={baseScreenContainer.containerBase}>
                <UserInputText valor={usuario} onChangeText={setUsuario} label={'Usuario'} teclado={"default"} tipo="primary"/>
                <UserInputText valor={senha} onChangeText={setSenha} label={'Senha'} teclado={"default"} tipo="primary"/>
            </View>
        
            <SubmitButton titulo={'Entrar'} tipo="secondary" funcao={fazerLogin}/>

            <Text style={{color:cores.text}}>Não possui conta? <TextLink texto={'Cadastre-se!'} rota={()=> navigation.navigate('Cadastro')}/></Text>
        </SafeAreaView>
    );
};
