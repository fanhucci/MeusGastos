import CategoriaPicker from "@/app/components/categoriaPicker";
import DatePicker from "@/app/components/datePicker";
import SubmitButton from "@/app/components/submitButton";
import UserInputText from "@/app/components/userInputText";
import { cores } from "@/app/theme/referencias/colors";
import {  listaCategorias } from "../utils/categorias";

import { useContext, useEffect, useState } from "react";
import { Modal, View, StyleSheet, ScrollView, Alert } from "react-native";

import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { firestore, db } from "@/firebaseConfig";
import { UserContext } from "@/contexts/userContext";

import { get, ref, set } from "firebase/database";


export default function InicioModal({ getter, setter }) {

    const { user,atualizaUsuario } = useContext(UserContext);

    const [valorGasto, setValorGasto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date());
    const [categoria, setCategoria] = useState(listaCategorias[0]);
    
    async function adicionaGasto() {


        try {

            const timestamp = Timestamp.fromDate(data);

            const gastoDetails = {
                descricao,
                data: timestamp,
                valor: Number(valorGasto),
                categoria,
            };

            const gastoRef = doc(collection(firestore, `usuarios/${user.uid}/gastos`));

            await setDoc(gastoRef, {
                id: gastoRef.id,
                ...gastoDetails
            });



            await atualizarTotais(user?.uid, gastoDetails);

            atualizaUsuario(user?.uid);


            Alert.alert("Sucesso", "Gasto salvo com sucesso.");
            limpaModal();

        } catch (error) {
            console.error("Erro ao salvar gasto:", error);
            Alert.alert("Erro", "Não foi possível salvar o gasto.");
        }
    }


    function isMesmaSemana(date1: Date, date2: Date): boolean {

        const d1 = new Date(date1);
        const d2 = new Date(date2);

    
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);


        const diaDaSemana1 = d1.getDay(); 
        const diaDaSemana2 = d2.getDay();

    
        const segunda1 = new Date(d1);
        const segunda2 = new Date(d2);
        segunda1.setDate(d1.getDate() - (diaDaSemana1 === 0 ? 6 : diaDaSemana1 - 1));
        segunda2.setDate(d2.getDate() - (diaDaSemana2 === 0 ? 6 : diaDaSemana2 - 1));

        return segunda1.getTime() === segunda2.getTime();
    }

    function calculaDatas(dado:Timestamp){

        const dataHoje = new Date();
        const dataGasto = dado.toDate();

        const mesmoMes = 
            dataHoje.getMonth() === dataGasto.getMonth() &&
            dataHoje.getFullYear() === dataGasto.getFullYear()
        ;

        const mesmoDia = 
            dataHoje.getDate() === dataGasto.getDate() && mesmoMes
        ;

        const mesmaSemana = isMesmaSemana(dataHoje, dataGasto)

        return {diario:mesmoDia,semanal:mesmaSemana,mensal:mesmoMes}

    }

    

    async function atualizarTotais(userId:string, gasto) {

        const datas = calculaDatas(gasto.data)
        const valor = gasto.valor;
        const categoria = gasto.categoria;
     
      
        const paths = {
            diario: `usuarios/${userId}/totais/diario`,
            semanal: `usuarios/${userId}/totais/semanal`,
            mensal: `usuarios/${userId}/totais/mensal`,
        };

 
        for(const path of Object.keys(paths)){
           
            if(datas[path]){

                const referencia = ref(db, paths[path]);
                const snap = await get(referencia);

                let atual = snap.exists()? snap.val():{ total:0, categorias:{} };

                atual.total+= valor;
       
                if(!atual.categorias[categoria]) atual.categorias[categoria] = 0;
                atual.categorias[categoria] += valor; 

                await set(referencia, atual);
                
            }
        }

    }


    function limpaModal() {
        setter(false);
        setDescricao("");
        setValorGasto("");
        setCategoria(listaCategorias[0]);
        setData(new Date());
    }



    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={getter}
            onRequestClose={() => setter(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>

                        <UserInputText
                            label="Valor"
                            onChangeText={setValorGasto}
                            valor={valorGasto}
                            teclado={'numeric'}
                            tipo="tertiary"
                        />

                        <UserInputText
                            label="Descrição"
                            onChangeText={setDescricao}
                            valor={descricao}
                            teclado="default"
                            tipo="tertiary"
                        />

                        <CategoriaPicker
                            valor={categoria}
                            setValor={setCategoria}
                            categorias={listaCategorias}
                        />

                        <DatePicker valor={data} setValor={setData} />

                        <View style={styles.buttonRow}>
                            <SubmitButton titulo="Cancelar" tipo="tertiary" funcao={limpaModal} />
                            <SubmitButton titulo="Salvar" tipo="primary" funcao={adicionaGasto} />
                        </View>

                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: cores.background,
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    scrollContent: {
        gap: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
