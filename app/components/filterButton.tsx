import { Pressable, Text, TextInput } from "react-native";
import { filterButtonStyle } from "../theme/tema";
import { cores } from "../theme/referencias/colors";

type filterButtonType={
    texto:string;
    filtro:string;
    funcao:()=>void;
    valor:string;
}

export default function FilterButton({texto, filtro, funcao, valor}:filterButtonType){
    return(
        <Pressable
            onPress={()=>funcao()}
            style={({pressed})=>[
                filterButtonStyle.button,
                pressed && filterButtonStyle.buttonPressed,
                valor === filtro && {backgroundColor:cores.primary}
            ]}>
            <Text style={[filterButtonStyle.text, valor === filtro && {fontWeight:'bold'}]}>{texto}</Text>
        </Pressable>
    );
};