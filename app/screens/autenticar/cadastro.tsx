import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, View } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { listaScreens } from "@/app";
import UserInputText from "@/app/components/userInputText";
import { useContext, useState } from "react";
import SubmitButton from "@/app/components/submitButton";
import { baseScreenContainer } from "@/app/theme/tema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { set,ref, } from "firebase/database";
import { UserContext, Usuario } from "@/contexts/userContext";


type CadastroScreenNavigationProp = NativeStackNavigationProp<listaScreens,"Cadastro">;

export type CadastroScreenProp = {
    navigation: CadastroScreenNavigationProp;
};

export default function CadastroScreen({navigation}:CadastroScreenProp){
    const {setUser} = useContext(UserContext);
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [senhaRepetida,setSenhaRepetida] = useState('');

    async function criarCadastro() {

        if(!email || !senha || !senhaRepetida){
            return Alert.alert("Erro ao cadastrar!","Preencha todos os campos");
        }

        if(senha!=senhaRepetida){
            return Alert.alert("Erro ao cadastrar!","As senhas precisam ser iguais");
        }


        try {

            const resultado = await createUserWithEmailAndPassword(auth, email, senha);
            console.log(resultado.user);
            const novoUsuario:Usuario = {
                uid:resultado.user.uid,
                email:resultado.user.email || "",
                fotoUrl:"",
                limite:0,
                nome:"",
                totais:{
                    diario:{
                        categorias:{valorVazio: 0},
                        total:0,
                    },
                    semanal:{
                        categorias:{valorVazio: 0},
                        total:0,
                    },
                    mensal:{
                        categorias: {valorVazio: 0},
                        total:0,
                    }
                }
            }

            console.log(novoUsuario);
            await set(ref(db, "usuarios/" + resultado.user.uid),novoUsuario);

            setUser(novoUsuario);
 
            Alert.alert("OK", "Cadastrado com sucesso!");

            navigation.navigate('HomeTabs');

        } catch (error:any) {

            const msgErro:Record<string,string> = {
                "auth/email-already-in-use": "Este e-mail já está cadastrado.",
                "auth/invalid-email": "E-mail inválido.",
                "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
            };

            const mensagem:string = msgErro[error.code] || "Erro ao entrar."; 

            return Alert.alert("Erro ao entrar!", mensagem);
        }
    }

    return(
        
        <SafeAreaView  style={[baseScreenContainer.screenContainer,{justifyContent:'space-around'}]}>

            <View style={[baseScreenContainer.containerBase, {gap:50}]}>
                <UserInputText label="E-mail" valor={email} onChangeText={setEmail} teclado="default" tipo="secondary"/>
                <UserInputText seguro={true} label="Senha" valor={senha} onChangeText={setSenha} teclado="default" tipo="secondary"/>
                <UserInputText seguro={true} label="Repita a senha" valor={senhaRepetida} onChangeText={setSenhaRepetida} teclado="default" tipo="secondary"/>

            </View>

            <SubmitButton titulo={'Cadastrar'} tipo="primary" funcao={criarCadastro}/>

        </SafeAreaView>
    );
};