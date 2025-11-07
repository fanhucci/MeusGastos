import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterButton from "../../../components/filterButton";
import { cores } from "../../../theme/referencias/colors";

export default function InicioHeader(){
    
    const filtros = ["Diario","Semanal","Mensal"];

    const valores = {
        Diario:'R$400,00',
        Semanal:'R$800,00',
        Mensal:"R$10000,00"
    }

    const [filtroSelecionado,setFiltroSelecionado] = useState(filtros[0]);

    
    return(
        
        <View style={styles.container}>
            
            <View style={styles.filtroContainer}>
                {
                    filtros.map((f,index)=>(
                        <FilterButton key={index} texto={f} filtro={f} funcao={()=>(setFiltroSelecionado(f))} valor={filtroSelecionado}/>
                    ))
                }
            </View>

            <View style={styles.tituloContainer}>
                <Text style={styles.titulo}>Gastos</Text>
                <Text style={styles.subtitulo}>{valores[filtroSelecionado]}</Text>
            </View>

        </View>

    );
};  

const styles = StyleSheet.create({
        container:{
            height:'30%',
            justifyContent:'space-around',
        },

        filtroContainer:{
            flexDirection:'row',

        },

        tituloContainer:{
            alignItems:'center',
        },

        titulo:{
            color:cores.text,
            fontWeight:'bold',
            fontSize:24
        },

        subtitulo:{
            color:cores.text,
            fontWeight:'bold',
            fontSize:28
        }
    });
