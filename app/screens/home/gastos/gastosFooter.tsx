import { View } from "react-native";
import GraphBar from "@/app/components/graphBar";

export default function GraphLimite(){
    return(
        <View style={{height:'15%',width:'90%'}}>
            <GraphBar percentage={20} texto="limite"/>
        </View>
    );
};