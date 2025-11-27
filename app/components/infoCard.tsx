import { Pressable, Text, View } from "react-native";
import { infoCardStyle } from "../theme/tema";

type InfoCardType = {
    obj:{
        descricao:string,
        data:string,
        valor:string,
        categoria:string
    };
    funcao:()=>void;
}

export default function InfoCard({obj,funcao}:InfoCardType){
    const data = new Date(obj.data);
    const dataFormatada = `${data.getDate().toString().padStart(2,'0')}/${(data.getMonth() + 1).toString().padStart(2,'0')}/${data.getFullYear()}`;
    return(
        <Pressable
            onPress={()=>funcao()}
            style={({pressed})=>[
                infoCardStyle.button,
                pressed && infoCardStyle.buttonPressed
            ]}
        >   

            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={infoCardStyle.data}>{dataFormatada}</Text>
                <Text style={infoCardStyle.texto}>{obj.categoria}</Text>
            </View>
            <Text style={infoCardStyle.titulo}>{obj.descricao}</Text>
            <Text style={infoCardStyle.texto}>R$ {obj.valor}</Text>
            
        </Pressable>
    );
};