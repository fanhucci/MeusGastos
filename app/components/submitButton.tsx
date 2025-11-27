import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";
import { cores } from "../theme/referencias/colors";
import { submitButtonStyle } from "../theme/tema";

interface SubmitButtonProps{
    titulo: string;
    tipo: "primary" | "secondary" | "tertiary";
    funcao: (event?: GestureResponderEvent) => void | Promise<void>;
}

export default function SubmitButton({titulo, tipo, funcao}:SubmitButtonProps){
    const presets = variacoes[tipo];

    return(
        <Pressable
            style={({ pressed }) => [
                submitButtonStyle.button,
                presets.button,
                pressed && submitButtonStyle.buttonPressed
            ]}
            onPress={funcao}
        >
            <Text style={[submitButtonStyle.text,presets.text]}>{titulo}</Text>
        </Pressable>
    );
};


const variacoes = {
  primary: { 
    button: { backgroundColor: cores.primary }, 
    text: { color: cores.text } 
  },
  secondary: { 
    button: { backgroundColor: cores.secondary }, 
    text: { color: cores.text } 
  },
  tertiary:{
    button: { backgroundColor: cores.danger }, 
    text: { color: cores.text } 
  }
};