import { cores } from "@/app/theme/referencias/colors";
import { View, Text, StyleSheet } from "react-native";

export default function GastosHeader(){

    return(

        <View style={styles.container}>
            <Text>Pesquisa</Text>
        </View>

    );

};

const styles = StyleSheet.create({
    container:{
        width:'80%',
        height:44,
        marginVertical:30,
        borderRadius:30,
        backgroundColor:cores.primary,

        justifyContent:'center',
        alignItems:'center'
    }
});