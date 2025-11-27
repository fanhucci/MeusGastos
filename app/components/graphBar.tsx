import { View,Text } from "react-native";
import { graphBarStyle } from "../theme/tema";
import { cores } from "../theme/referencias/colors";

type graphBarType={
    percentage:number,
    texto:string
}



export default function GraphBar({percentage,texto}:graphBarType){

    let graphBarColor = cores.accent;

    if(percentage >50) {graphBarColor = cores.danger;}
    return(
        <View style={{flexDirection:'column', width:'100%'}}>

            <View style={graphBarStyle.container}>
                <View style={[graphBarStyle.bar,{width:`${percentage}%`, backgroundColor:graphBarColor}]}></View>
            </View>

            <Text style={graphBarStyle.text}>{texto} {percentage}%</Text>
        </View>
    );
};
