import SubmitButton from "@/app/components/submitButton";
import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";



export default function PerfilBody(){

    const navigation = useNavigation<NativeStackNavigationProp<any>>()

    const {setUser} = useContext(UserContext);
    
    async function logout(){
        try{
            await signOut(auth);

            setUser(null);
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }], 
            });
        }
        catch(error){
            console.error("Erro no logout:", error);
            Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
        }
        
    }

    return(

        <View>

            <View style={[styles.container]}>
                <SubmitButton titulo="Sair" funcao={logout} tipo="tertiary"/>
            </View>
        </View>

    );

};

const styles = StyleSheet.create({
    
    container:{
        paddingVertical:30,
    }

});