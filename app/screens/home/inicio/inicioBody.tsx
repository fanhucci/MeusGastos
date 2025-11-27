import { StyleSheet, View } from "react-native";
import GraphBar from "@/app/components/graphBar";
import SubmitButton from "@/app/components/submitButton";
import { cores } from "@/app/theme/referencias/colors";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";

export default function InicioBody({setter}){

    const {user} = useContext(UserContext);
    const [dados,setDados] = useState([]);

    useEffect(() => {

        if (!user?.totais?.mensal.categorias) return;

        const total = user.totais.mensal.total;
        const categorias = user.totais.mensal.categorias;

        const resultado = Object.keys(categorias).map(nome => {
            const valor = categorias[nome];
            const porcentagem = total > 0 
                ? Math.round((valor / total) * 100) 
                : 0;

            return {
                nome,
                porcentagem
            };
        });

        resultado.sort((a, b) => b.porcentagem - a.porcentagem);


        setDados(resultado);

    }, [user]);

    return(

        <View style={styles.container}>

            <View style={styles.graphContainer}>
                {dados
                    .filter(categoria => categoria.porcentagem != 0)
                    .map(categoria => (
                        <GraphBar
                        key={categoria.nome}
                        percentage={categoria.porcentagem}
                        texto={categoria.nome}
                        />
                    ))
                }
            </View>

            <SubmitButton titulo="Novo gasto" tipo="primary" funcao={()=>setter(true)}/>

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
        gap:30,
        justifyContent:"space-evenly",
        paddingVertical:30
    }
});