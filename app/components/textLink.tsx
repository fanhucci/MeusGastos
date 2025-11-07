import { StyleSheet, Text } from "react-native";
import { cores } from "../theme/referencias/colors";

type TextLinkProp = {
    texto:string;
    rota: ()=>void;
}

export default function TextLink({texto, rota}:TextLinkProp){

    return(
        <Text
        onPress={rota}
        style={estilo.text}
        >
            {texto}
        </Text>
    );
};

const estilo = StyleSheet.create({
    text: {
        color: cores.accent,
        fontWeight: 'bold'
    }
})