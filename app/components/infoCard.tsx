import { Pressable, Text } from "react-native";
import { infoCardStyle } from "../theme/tema";

type InfoCardType = {
    obj:{
        titulo:String,
        data:String,
        valor:String
    };
    funcao:()=>void;
}

export default function InfoCard({obj,funcao}:InfoCardType){
    return(
        <Pressable
            onPress={()=>funcao()}
            style={({pressed})=>[
                infoCardStyle.button,
                pressed && infoCardStyle.buttonPressed
            ]}
        >   

            <Text style={infoCardStyle.data}>{obj.data}</Text>
            <Text style={infoCardStyle.titulo}>{obj.titulo}</Text>
            <Text style={infoCardStyle.texto}>{obj.valor}</Text>
        </Pressable>
    );
};