import { Text, TextInput, KeyboardTypeOptions, Pressable } from "react-native";
import { userInputTextStyle } from "../theme/tema";
import { useState, useRef } from "react";
import { cores } from "../theme/referencias/colors";

type UserInputTextProp={
    valor:string,
    onChangeText:(text:string)=>void,
    label:string,
    teclado:KeyboardTypeOptions,
    tipo:"primary" | "secondary" | "tertiary",
    seguro?:boolean,
    
};

export default function UserInputText({ valor, onChangeText, label, teclado, tipo, seguro}:UserInputTextProp){
    const [isFocused,setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const presets = variacoes[tipo];
    
    return(
        <Pressable
            onPress={()=>inputRef.current?.focus()}
        >
            <Text style={[userInputTextStyle.text, presets.text]}>{label}</Text>
            <TextInput
                ref={inputRef}
                style={[
                    userInputTextStyle.input,
                    presets.text,
                    isFocused && userInputTextStyle.inputFocused,
                    presets.inputPressed,
                ]}
                value={valor}
                onChangeText={onChangeText}
                keyboardType={teclado}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>setIsFocused(false)}
                placeholderTextColor={presets.placeholder}
                secureTextEntry={seguro}
            ></TextInput>
        </Pressable>
    );
};

const variacoes = {
    primary:{
        text:{color:cores.text},

        inputPressed:{borderColor:cores.text},
        placeholder:cores.text
    },
    secondary:{
        text:{color:cores.text},
        inputPressed:{borderColor:cores.text},
        placeholder:cores.text
    },
    tertiary:{
        text:{color:cores.textSecondary},
        inputPressed:{borderColor:cores.primary},
        placeholder:cores.textSecondary
    }
}
