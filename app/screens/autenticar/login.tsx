
import TextLink from "@/app/components/textLink";
import SubmitButton from "@/app/components/submitButton";
import UserInputText from "@/app/components/userInputText";
import { auth, db } from "../../../firebaseConfig";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { listaScreens } from "@/app";
import { baseScreenContainer } from "@/app/theme/tema";
import { cores } from "@/app/theme/referencias/colors";
import {  useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { UserContext, Usuario } from "@/contexts/userContext";

type LoginScreenNavigationProp = NativeStackNavigationProp<listaScreens,"Login">;

export type LoginScreenProp = {
    navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }:LoginScreenProp){


    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const {setUser} = useContext(UserContext);

    async function buscaUsuario(id:string){

        if(!id){
            return Alert.alert("Erro","Usuario vazio!");
        }

        try {
            const usuario = await get(ref(db, `usuarios/${id}`));

            if(!usuario.exists()){
                Alert.alert("Erro", "Usuário não encontrado!");
                return null;
            }
        
            return usuario.val();

        } catch (error) {
            Alert.alert("Erro", "Falha ao buscar usuário!");
            console.log(error);
            return null;
        }
    }

    async function fazerLogin(){
        
        if(!email.trim() || !senha.trim()){
            return Alert.alert("Erro ao fazer login!","Preencha todos os campos")
        }

        try {
            const resultado = await signInWithEmailAndPassword(auth, email, senha);

            const usuario:Usuario|null = await buscaUsuario(resultado.user.uid);

            if(!usuario){
                return;
            }

            setUser(usuario);

            navigation.navigate('HomeTabs');

        } catch (error:any) {

            const msgErro:Record<string,string> = {
                "auth/invalid-credential": "E-mail ou senha incorretos.",
                "auth/user-not-found": "Usuário não encontrado.",
                "auth/invalid-email": "E-mail inválido.",
            };

            const mensagem:string = msgErro[error.code] || "Erro ao entrar."; 
            console.error(error)
            return Alert.alert("Erro ao entrar!", mensagem);
        }

    }

    return(

        <SafeAreaView style={[baseScreenContainer.screenContainer,{backgroundColor:cores.primary, justifyContent:'space-around'}]}>

            <View style={[baseScreenContainer.containerBase,{gap:50}]}>

                <UserInputText valor={email} onChangeText={setEmail} label={'E-mail'} teclado={"default"} tipo="primary"/>
                <UserInputText seguro={true} valor={senha} onChangeText={setSenha} label={'Senha'} teclado={"default"} tipo="primary"/>

            </View>
        
            <SubmitButton titulo={'Entrar'} tipo="secondary" funcao={fazerLogin}/>

            <Text style={{color:cores.text}}>Não possui conta? <TextLink texto={'Cadastre-se!'} cor="accent" rota={()=> navigation.navigate('Cadastro')}/></Text>

        </SafeAreaView>
    );
};
