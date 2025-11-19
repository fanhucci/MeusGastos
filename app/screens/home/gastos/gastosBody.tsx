import { View, FlatList, StyleSheet, Text, Alert } from "react-native";
import InfoCard from "@/app/components/infoCard";
import { cores } from "@/app/theme/referencias/colors";

import { firestore } from "@/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";


export default function GastosBody({filtro}){
    const {user} = useContext(UserContext);
    const [gastos, setGastos] = useState<any[]>([]);
    const [dadosFiltrados,setDadosFiltrados] = useState([]);


    useEffect(() => {
        async function carregarGastos() {
            if (!user) return;

            try {
                const gastosRef = collection(firestore, `usuarios/${user.uid}/gastos`);

                const q = query(gastosRef, orderBy("data","desc"));

                const dados = await getDocs(q);

                if (dados.empty) {
                    setGastos([]);
                    return;
                }

                const listaGastos = dados.docs.map(doc =>{
                    const d = doc.data();
                    return{
                        ...d,
                        data:d.data.toDate()
                    }
                });

                setGastos(listaGastos);
                
            } catch (error) {
                console.error("Erro ao pegar gastos:", error);
            }
        }

        carregarGastos();

    }, [user]);

    useEffect(()=>{

        const listaFiltrada = gastos.filter((gasto)=>(

            gasto.descricao.toLowerCase().includes(filtro.toLowerCase())
        ));

        setDadosFiltrados(listaFiltrada);

        
    },[filtro,gastos])

    return(

        <View style={styles.container}>

            {dadosFiltrados.length === 0 ? (
                <Text style={{color: cores.textSecondary, textAlign: 'center', paddingTop:50, fontWeight:"bold",fontSize:20}}>Nenhum gasto ainda...</Text>
                ) : (
                    <FlatList
                        data={dadosFiltrados}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <InfoCard obj={item} funcao={() => console.log('clicado')} />
                        )}
                    />
                )
            }

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