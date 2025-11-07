import { View, FlatList, StyleSheet } from "react-native";
import InfoCard from "@/app/components/infoCard";
import { cores } from "@/app/theme/referencias/colors";
import { dadosTeste } from "../utils";


export default function GastosBody(){
    return(

        <View style={styles.container}>

            <FlatList
                data={dadosTeste}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <InfoCard obj={item} funcao={() => console.log('clicado')} />
                )}        
            />

        </View>

    );
};

const styles = StyleSheet.create({

    container:{

        height:'80%',
        width:'100%',
        marginBottom:30,

        backgroundColor:cores.tertiary,
        borderRadius:30,

        overflow:'hidden',


    },

});