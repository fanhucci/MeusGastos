import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { listaScreens } from "@/app";
import UserInputText from "@/app/components/userInputText";
import { useState } from "react";
import SubmitButton from "@/app/components/submitButton";
import { baseScreenContainer } from "@/app/theme/tema";
import { cores } from "@/app/theme/referencias/colors";

type CadastroScreenNavigationProp = NativeStackNavigationProp<listaScreens,"Cadastro">;

export type CadastroScreenProp = {
    navigation: CadastroScreenNavigationProp;
};

export default function CadastroScreen({navigation}:CadastroScreenProp){
    const [usuario,setUsuario] = useState('');
    const [senha,setSenha] = useState('');
    const [senhaRepetida,setSenhaRepetida] = useState('');

    return(
        
        <SafeAreaView style={
            [
                baseScreenContainer.container,
                {justifyContent:'space-around',
                    backgroundColor:cores.secondary
                }
            ]
        }
        >
            <View style={baseScreenContainer.containerBase}>
                <UserInputText label="Usuario" valor={usuario} onChangeText={setUsuario} teclado="default" tipo="secondary"/>
                <UserInputText label="Senha" valor={senha} onChangeText={setSenha} teclado="default" tipo="secondary"/>
                <UserInputText label="Repita a senha" valor={senhaRepetida} onChangeText={setSenhaRepetida} teclado="default" tipo="secondary"/>

            </View>

            <SubmitButton titulo={'Cadastrar'} tipo="primary" funcao={()=>console.log('Cadastrando...')}/>

        </SafeAreaView>
    );
};