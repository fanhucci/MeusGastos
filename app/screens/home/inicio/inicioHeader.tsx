import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterButton from "../../../components/filterButton";
import { cores } from "../../../theme/referencias/colors";
import { UserContext } from "@/contexts/userContext";

export default function InicioHeader(){
    
    const filtros = ["Diario","Semanal","Mensal"];

    const {user} = useContext(UserContext);

    const [filtroSelecionado,setFiltroSelecionado] = useState(filtros[0]);

    const valores = {
        Diario:user?.totais.diario.total,
        Semanal:user?.totais.semanal.total,
        Mensal:user?.totais.mensal.total
    }


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
