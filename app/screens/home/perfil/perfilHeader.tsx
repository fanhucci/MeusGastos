import { View,Text, StyleSheet } from "react-native";
import GraphBar from "@/app/components/graphBar";
import { usuarioTeste } from "../utils";
import { cores } from "@/app/theme/referencias/colors";

export default function PerfilHeader(){

    return(

        <View style={styles.container}>
            
            <View style={styles.perfilContainer}>
            
                <View style={styles.foto}>
                    <Text>FOTO</Text>
                </View>

                <View>
                    <Text style={styles.perfilTitulo}>{usuarioTeste.nome}</Text>    
                    <Text style={styles.perfilSobre}>{usuarioTeste.email}</Text>
                    <Text style={styles.perfilSobre}>{usuarioTeste.senha}</Text>
                </View>

            </View>
            
            
            <View style={styles.graficoContainer}>
                <GraphBar percentage={50} texto="limite"/>
            </View>                

        </View>

    );

};

const styles = StyleSheet.create({

    container:{
        flex:0.3,
        width:'100%',
        backgroundColor:cores.tertiary,

        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,

        paddingVertical:30,
        

        justifyContent:'space-around',

        alignItems:'center'
    },

    perfilContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:50,
        alignSelf:'flex-start',
        paddingHorizontal:30
    },

    foto:{
        backgroundColor:cores.primary,
        borderRadius:100,
        height:80,
        width:80,

        justifyContent:'center',
        alignItems:'center',

        borderWidth:1,
        borderColor:cores.secondary
    },

    perfilTitulo:{
        fontSize:24,
        color:cores.textSecondary,
        fontWeight:'bold'
    },

    perfilSobre:{
        fontSize:20,
        color:cores.textSecondaryLight
    },

    graficoContainer:{
        width:'90%',
    }

});