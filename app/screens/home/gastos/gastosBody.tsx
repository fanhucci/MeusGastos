import { View, FlatList, StyleSheet, Text } from "react-native";
import InfoCard from "@/app/components/infoCard";
import { cores } from "@/app/theme/referencias/colors";

import { firestore } from "@/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface GastosBodyProps {
  filtro: string;
  dataInicial: Date | null;
  dataFinal: Date | null;
}

export default function GastosBody({ filtro, dataInicial, dataFinal }: GastosBodyProps) {
  const { user } = useContext(UserContext);
  const [gastos, setGastos] = useState<any[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<any[]>([]);

  useEffect(() => {
    async function carregarGastos() {
        if (!user) return;

        try {
            const gastosRef = collection(firestore, `usuarios/${user.uid}/gastos`);
            const q = query(gastosRef, orderBy("data", "desc"));

            const dados = await getDocs(q);

            if (dados.empty) {
            setGastos([]);
            return;
            }

            const listaGastos = dados.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                ...d,
                data: d.data.toDate(), 
            };
            });

            setGastos(listaGastos);

        } catch (error) {
            console.error("Erro ao pegar gastos:", error);
        }
    }

    carregarGastos();
    }, [user]);


        useEffect(() => {
        let lista = gastos;

 
        if (filtro && filtro.trim() !== "") {
            lista = lista.filter((gasto) =>
            gasto.descricao.toLowerCase().includes(filtro.toLowerCase())
            );
        }


        const normaliza = (data: Date) => {
            const d = new Date(data);
            d.setHours(0, 0, 0, 0);
            return d;
        };

        const normalizaFinal = (data: Date) => {
            const d = new Date(data);
            d.setHours(23, 59, 59, 999);
            return d;
        };

   
        if (dataInicial) {
            const inicio = normaliza(dataInicial);
            lista = lista.filter((gasto) =>
            gasto.data >= inicio
            );
        }

      
        if (dataFinal) {
            const fim = normalizaFinal(dataFinal);
            lista = lista.filter((gasto) =>
            gasto.data <= fim
            );
        }

        setDadosFiltrados(lista);

    }, [filtro, dataInicial, dataFinal, gastos]);

  return (
    <View style={styles.container}>
      {dadosFiltrados.length === 0 ? (
        <Text
          style={{
            color: cores.textSecondary,
            textAlign: "center",
            paddingTop: 50,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Nenhum gasto encontrado...
        </Text>
      ) : (
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InfoCard obj={item} funcao={() => console.log("clicado")} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: "100%",
    marginBottom: 30,
    backgroundColor: cores.tertiary,
    borderRadius: 30,
    overflow: "hidden",
  },
});
