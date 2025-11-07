import { StyleSheet, View } from "react-native";
import GraphBar from "@/app/components/graphBar";
import SubmitButton from "@/app/components/submitButton";
import { cores } from "@/app/theme/referencias/colors";

export default function InicioBody(){

    return(

        <View style={styles.container}>

            <View style={styles.graphContainer}>
                <GraphBar percentage={40} texto="lazer"/>

                <GraphBar percentage={15} texto="dia a dia"/>

                <GraphBar percentage={25} texto="locomoçao"/>

                <GraphBar percentage={60} texto="comida"/>
            </View>


            <SubmitButton titulo="Novo gasto" tipo="primary" funcao={()=>setModalVisivel(true)}/>

        </View>

    );

};


const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',

        justifyContent:'space-around',
        alignItems:'center',

        backgroundColor:cores.tertiary,
        borderRadius:30,
    },

    graphContainer:{
        width:'80%',
        alignItems:'center'
    }
});