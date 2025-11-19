import { View,Text, StyleSheet, Pressable, Alert, Image } from "react-native";
import GraphBar from "@/app/components/graphBar";
import { cores } from "@/app/theme/referencias/colors";
import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import UserInputText from "@/app/components/userInputText";
import SubmitButton from "@/app/components/submitButton";

import { db } from "@/firebaseConfig";
import { ref, set } from "firebase/database";
import ImagemPerfil from "@/app/components/imagemPerfil";
import { Feather } from "@expo/vector-icons";
import TextLink from "@/app/components/textLink";
import PerfilLimiteModal from "./perfilLimiteModal";
import { notificarAgora } from "@/utils/notificacoes";

export default function PerfilHeader(){
    const {user,atualizaUsuario} = useContext(UserContext);
    const [modalOn,setModalOn] = useState(false);
    const [editOn,setEditOn] = useState(false);
    const [nome,setNome] = useState(user?.nome || "");
    const [porcentagem,setPorcentagem] = useState(0);

    useEffect(() => {
        const gasto = user?.totais?.mensal?.total;
        const limite = user?.limite;

        if (gasto == null || limite == null || limite === 0) {
            setPorcentagem(0);
            return;
        }

        const calculo = Math.round((gasto / limite) * 100);
        const exibicao = Math.min(calculo, 100);
        setPorcentagem(exibicao);

    }, [user]);


    function salvarPerfil(){

        const nomeRef = ref(db, `usuarios/${user.uid}/nome`);
        set(nomeRef, nome.trim());

        atualizaUsuario(user?.uid);

        setEditOn(false)
    };

    function fecharEdicao(){
        
        setNome(user?.nome);
        setEditOn(false);
    }

    return( 

        <View style={editOn? styles.containerEditOn :styles.container}>
            
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingHorizontal: 35, 
                }}
            >
                <Text style={{ fontSize: 30, fontWeight: "bold", color: cores.textSecondary }}>
                    Perfil
                </Text>

                <Pressable
                    onPress={() => setEditOn(true)}
                    style={({ pressed }) => ({
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: pressed ? 0.6 : 1,
                    })}
                >
                    {editOn?
                        <></>
                    :
                        <Feather name="edit-3" size={22} color={cores.textSecondaryLight} />
                    }
                </Pressable>
            </View>

            
            <View style={editOn? styles.perfilContainerEditOn: styles.perfilContainer}>
            
                <View style={editOn? styles.fotoEditiOn : styles.foto}>
                    {editOn? 
                        <ImagemPerfil/>
                    :
                        <Image
                            source={{uri:user?.fotoUrl}}
                            style={{
                                width:90,
                                height:90,
                                borderRadius:100
                            }}
                        />
                    }
                    
                </View>

                <View>
                    {editOn? 
                        <>
                            <UserInputText label={""} valor={nome} teclado="default" tipo="tertiary" onChangeText={setNome}/>
                            <Text style={[styles.perfilSobre,{paddingLeft:20}]}>{user?.email} </Text>

                            <View style={{flexDirection:"row",paddingTop:30, transform:[{scale:0.8}]}}>
                                <SubmitButton titulo="Cancelar" tipo="tertiary" funcao={fecharEdicao}/>
                                <SubmitButton titulo="Salvar" tipo="primary" funcao={salvarPerfil}/>
                            </View>
                        </>
                    :
                        <>
                            <Text style={styles.perfilTitulo}>{user?.nome? user.nome: "Definir nome"}</Text>    
                            <Text style={styles.perfilSobre}>{user?.email} </Text>
                        </>
                    }
                </View>

            </View>
            
            
           {user?.limite?  
                editOn?
                    <></>
                    :
                    <View style={styles.graficoContainer}>
                        <Pressable
                            onPress={()=>setModalOn(true)}
                        >
                            <GraphBar percentage={porcentagem} texto="limite"/>
                        </Pressable>
                    </View>               
            :
                editOn?
                    <></>
                    :
                    <TextLink rota={()=>(setModalOn(true))} texto="Definir limite mensal" cor="danger"/>
                
           } 

           <PerfilLimiteModal getter={modalOn} setter={setModalOn} />

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

    containerEditOn:{
        flex:0.8,
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

    perfilContainerEditOn:{
        flexDirection:"column",
        alignItems:"center",
        gap:30
    },

    foto:{
        borderRadius:100,
        height:90,
        width:90,

        justifyContent:'center',
        alignItems:'center',

        borderWidth:1,
        borderColor:cores.secondary
    },
    fotoEditiOn:{
        backgroundColor:cores.primary,
        borderRadius:100,
        height:160,
        width:160,

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